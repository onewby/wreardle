<!-- Bottom of the page - contains the "invite to play" text, play button, search bar and submit/skip buttons
     Also relays guess events to /src/routes/+page.svelte -->
<script lang="ts">
    import AnswerButtonRow from "./AnswerButtonRow.svelte";
    import AnswerPlayRow from "./AnswerPlayRow.svelte";
    import AnswerProgressBar from "./AnswerProgressBar.svelte";
    import Inviter from "../Inviter.svelte";
    import SearchBox from "./SearchBox.svelte";
    import type {Song} from "../../types/song.type";
    import {createEventDispatcher} from "svelte";

    export let songs: Song[] = []
    // Contents of the search bar
    let searchQuery = ""
    let dispatch = createEventDispatcher()

    /**
     * When the user submits a guess, pass it up to the page controlling everything
     */
    function onGuess() {
        dispatch("guess", searchQuery)
        // Reset the search bar after a guess is made
        searchQuery = ""
    }
</script>

<div class="main-container-outer answer-footer">
    <div class="main-container-inner">
        <Inviter />
    </div>
    <AnswerProgressBar />
    <div class="main-container-inner">
        <AnswerPlayRow songs={songs} />
        <SearchBox songs={songs} bind:searchQuery />
        <AnswerButtonRow on:skip on:guess={onGuess} />
    </div>
</div>

<style>
    .answer-footer {
        flex-direction: column;
        align-items: center;
    }
</style>