<script lang="ts">
    import Header from '$lib/Header.svelte';
    import AnswersContainer from "../lib/answering/AnswersContainer.svelte";
    import Expander from "../lib/Expander.svelte";
    import AnswerFooter from "../lib/answering/AnswerFooter.svelte";
    import {
        sCurrentStreak, sFinished,
        sGuess,
        sGuesses,
        sLastSuccessDate,
        sMaximumStreak,
        sScores,
        sSuccess,
        sTries
    } from "../lib/stores";
    import {formatSong, getSong, getToday} from "../lib/util";
    import Endboard from "../lib/endboard/Endboard.svelte";
    import Information from "../lib/Information.svelte";
    import Help from "../lib/Help.svelte";
    import { browser } from "$app/environment";
    import type {PageData} from "./$types";

    // Contains list of songs
    export let data: PageData

    // Controls the visibility of the statistics/share dialog
    let openEndboard = false
    // Controls the visibility of the info dialog
    let openInfo = false
    // Controls the visibility of the help dialog
    let openHelp = !(browser && localStorage.getItem("howToPlay") != null)

    /**
     * When the user skips a turn...
     */
    function onSkip() {
        // Set textbox to skip
        sGuesses[$sGuess].set("Skipped")
        // Update guess counter
        sGuess.update(n => n + 1)
        // If 6 guesses done, end today's game
        checkDone()
    }

    /**
     * When the user guesses a song...
     * @param event Event containing a string with the user's guess
     */
    function onGuess(event: CustomEvent<string>) {
        // Set textbox to provided guess
        sGuesses[$sGuess].set(event.detail)
        // If the guess matches...
        if(event.detail === formatSong(getSong(data.songs))) {
            // Update the total number of finished attempts
            sTries.update(n => n + 1)
            // Update the tally for this specific number of guesses
            sScores[$sGuess].update(n => n + 1)
            // Increment the current streak
            sCurrentStreak.update(n => n + 1)
            // Set maximum streak value if warranted
            if($sCurrentStreak > $sMaximumStreak) {
                sMaximumStreak.set($sCurrentStreak)
            }
            sLastSuccessDate.set(getToday())
            sSuccess.set(true)
            sFinished.set(true)
        } else {
            sGuess.update(n => n + 1)
            checkDone()
        }
    }

    async function checkDone() {
        if($sGuess == 6) {
            // Set finished, but not success
            sFinished.set(true)
            sTries.update(n => n + 1)
            sCurrentStreak.set(0)
            sScores[$sGuess].update(n => n + 1)
        }
    }
</script>

<svelte:head>
	<title>Wreardle</title>
	<meta name="description" content="Guess the pro wrestling theme in 6 turns" />
</svelte:head>

<body>
    <Header on:stats={() => openEndboard = true} on:info={() => openInfo = true} on:help={() => openHelp = true} />
    <AnswersContainer/>
    <Expander />
    <AnswerFooter songs={data.songs} on:skip={onSkip} on:guess={onGuess} />
    <Endboard songs={data.songs} bind:open={openEndboard} />
    <Information bind:open={openInfo} />
    <Help bind:open={openHelp} />
</body>

<style>
    :root {
        font-family: 'Noto Sans', Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
        Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        --background-color: var(--bs-dark);
        --accent-color: #d0021b;
        --tertiary-color: #d0dde9;
        --text-color: white;
        --incorrect-color: var(--accent-color);
        --correct-color: lime;
    }

    :global(button, input, optgroup, select, textarea) {
        font-family: 'Noto Sans', Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
        Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    body {
        min-height: 100vh;
        margin: 0;
        background-color: var(--background-color);
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        flex-flow: column;
    }

    :global(.popup) {
        --bs-modal-bg: var(--background-color);
        --bs-modal-color: var(--text-color);
    }

    :global(.feather, a .feather) {
        color: var(--text-color);
    }
</style>
