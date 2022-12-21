<!-- Dialog box shown at the end of a game (or toggled manually).
     Shows statistics, and the actual song if the game is over. -->
<script lang="ts">
    import {ShareIcon} from "svelte-feather-icons";
    import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "sveltestrap";
    import {sFinished, sScores, sSuccess, sTries, sTimeToNext, sGuess} from "../stores";
    import {onDestroy} from "svelte";
    import {formatSong, getSong} from "../util";
    import {browser} from "$app/environment"
    import Statistics from "./Statistics.svelte";
    import Chart from "./Chart.svelte";
    import Statistic from "./Statistic.svelte";

    // List of all songs
    export let songs = []
    // Is this dialog box open?
    export let open = false
    // Toggle the box being open
    const toggle = () => open = !open
    // CSS-specified accent colour (or fallback to a default if pre-rendering)
    const colour = browser ? getComputedStyle(document.body).getPropertyValue("--accent-color") : "#F00"
    // List of number of wins in n turns from 1 to 6 - initial values eventually updated with the values from each score store
    let scores = sScores.map(() => 0)
    // List of bar labels for the win statistics bar chart
    let labels = [...sScores.keys()].map(i => (i + 1).toString())

    // Event handler: open the dialog when the game is finished
    onDestroy(sFinished.subscribe(val => {
        if(val) open = true
    }))

    // Event handler: when a win score store updates, update the relevant bar chart value
    sScores.forEach((score, i) => {
        onDestroy(score.subscribe(val => {
            scores[i] = val
        }))
    })

    // Title of the dialog box
    $: title = $sFinished ? ($sSuccess ? "Congratulations!" : "Unlucky!") : "Statistics"

    const pluralTries = (n: number) => `${n} tr${n === 1 ? "y" : "ies"}`;

    // Share information to be used by the Web Share API
    function getShareData() {
        return {
            title: "Wreardle",
            url: "https://wreardle.onewby.me",
            text: $sFinished ? `I found today's Wreardle in ${pluralTries($sGuess + 1)}.` : "I'm trying to guess today's Wreardle!"
        }
    }

    /**
     * When the share button is pressed, share using the Web Share API if supported
     */
    function onShare() {
        let shareData = getShareData()
        if(typeof navigator.share === "function" && navigator.canShare(shareData)) {
            navigator.share(shareData)
        }
    }
</script>

<Modal fade={true} isOpen={open} {toggle} contentClassName={"popup"}>
    <ModalHeader {toggle}>{title}</ModalHeader>
    <ModalBody>
        <div class="endboard-body">
            {#if songs.length > 0 && $sFinished}
                <p>{formatSong(getSong(songs))}</p>
                <iframe title="Correct song" width="100%" height="166" scrolling="no" frameborder="no" style="margin-bottom: 1em;"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{getSong(songs).soundcloudID}&buying=false&sharing=false&show_playcount=false&show_user=false&download=false&color={colour}">
                </iframe>
            {/if}
            <Statistics />
            <div class:hide={$sTries === 0}>
                <Chart labels={labels} values={scores} style="margin-top: 1.4em" />
            </div>
        </div>
    </ModalBody>
    <ModalFooter>
        <div class="endboard-footer">
            {#if $sTimeToNext === "00:00:00"}
                <Button on:click={() => document.location.reload()}>Refresh for next Wreardle</Button>
            {:else}
                <Statistic title="until next Wreardle" value={$sTimeToNext} style="width: fit-content; align-items: start" />
            {/if}
            <button on:click={onShare}><ShareIcon class="endboard-share-icon"/>Share</button>
        </div>
    </ModalFooter>
</Modal>

<style>
    .endboard-body {
        display: flex;
        flex-direction: column;
    }

    .endboard-footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    :global(.modal-header .btn-close) {
        background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23FFF'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
        color: white;
    }

    .hide {
        display: none;
    }

    :global(.endboard-footer .feather) {
        color: black;
    }

    :global(.endboard-share-icon) {
        margin-right: 0.75em;
    }
</style>