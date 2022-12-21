<!-- Song player - contains play button and hidden SoundCloud song widget to play using -->
<script>
    import {PauseCircleIcon, PlayCircleIcon} from "svelte-feather-icons";
    import {onMount} from "svelte";
    import {sMusicProgress, sPlayTime} from "../stores";
    import {getSong} from "../util";

    // List of all songs
    export let songs = []
    // Controls whether the song is playing or not
    let playing = false
    // SoundCloud widget iFrame
    let scWidget
    // SoundCloud widget API object
    let widget

    /* ESLint has an issue with the Soundcloud Widget API */
    /* eslint-disable no-undef */
    onMount(async () => {
        if(scWidget !== undefined) {
            widget = SC.Widget(scWidget)
            // Widget listener: song playing and progressing
            widget.bind(SC.Widget.Events.PLAY_PROGRESS, (e) => {
                // Update the music progress store with the widget's state
                sMusicProgress.set(e.currentPosition)
            })
        }
    })

    /**
     * Once we reach the end of our permitted time for this guess, stop playing
     */
    function pauseOnceDone() {
        let time = $sPlayTime * 1000
        // The song player can be laggy to start, so we do not just rely on a single setTimeout.
        widget.getPosition(pos => {
            // Get the time elapsed - continue once we reach where we think the song should end
            setTimeout(() => {
                // If we have exceeded the play time for this turn, stop playing
                if(pos >= time) {
                    widget.pause()
                    playing = false
                    widget.seekTo(0)
                    widget.unbind(SC.Widget.Events.READY)
                    widget.unbind(SC.Widget.Events.PLAY)
                } else {
                    // Else wait for the remaining time to elapse and try again
                    pauseOnceDone()
                }
            }, time - pos)
        })
    }

    /**
     * When the play button is clicked, start playing the song from the beginning
     */
    function play() {
        widget.bind(SC.Widget.Events.READY, () => {
            widget.setVolume(50)
            widget.seekTo(0)
            widget.play()
            playing = true
            // Stop once the permitted time has elapsed
            pauseOnceDone()
        })
    }
    /* eslint-enable no-undef */
</script>

<div class="play-row">
    {#if songs !== undefined && songs.length > 0}
        <iframe title="Theme player" bind:this={scWidget} width="0" height="0" style="display:none;" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{getSong(songs).soundcloudID}"></iframe>
    {/if}
    <span>0:00</span>
    <a href="##" role="button" on:click={play}>
        {#if playing}
            <PauseCircleIcon fill="white" size="48" strokeWidth={1.25} />
        {:else}
            <PlayCircleIcon fill="white" size="48" strokeWidth={1.25} />
        {/if}
    </a>
    <span>0:16</span>
</div>

<style>
    .play-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>