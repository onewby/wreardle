<!-- Input field used for guessing answers -->
<script lang="ts">
    import Answer from "./Answer.svelte";
    import {DropdownItem} from "sveltestrap";
    import type {Song} from "../../types/song.type";
    import {formatSong} from "../util";
    import {sFinished} from "../stores";
    import {SearchIcon, XIcon} from "svelte-feather-icons";

    // Current user input
    export let searchQuery = ''
    // List of all songs
    export let songs: Song[] = []

    // Is the input field currently active (so should search suggestions be showing)?
    let isFocused = true
    // List of search suggestions
    let results: string[] = []

    // List of search suggestions
    $: searches = songs.map(formatSong)
    // When searchQuery updates, filter through the list of songs and update the list of search suggestions
    $: {
        results = []
        if(searchQuery != "") {
            let searcher = new RegExp(`.*${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*`, 'iu')
            results = searches.filter(line => searcher.test(<string>line))
        }
    }

    /**
     * On user input, activate the search suggestions field
     */
    function onInput() {
        isFocused = true
    }

    /**
     * When the clear icon is clicked, clear the input field
     */
    function clearInput() {
        searchQuery = ""
        results = []
        isFocused = false
    }

    /**
     * When a suggestion is clicked, populate the input field with the suggestion
     * @param input Search suggestion
     */
    function fillInput(input: string) {
        searchQuery = input
        isFocused = false
    }
</script>

<div class="dropup">
    <Answer placeholder="Know it? Search for the title" disabled={$sFinished} data-bs-toggle="dropdown"
            bind:value={searchQuery} on:input={onInput}>
        <SearchIcon fill="white" slot="prefix" />
        <a slot="suffix" href="##" role="button" on:click={clearInput}><XIcon fill="white" /></a>
    </Answer>
    <div class="dropdown-menu dropdown-menu-dark" class:show={isFocused && searchQuery !== ''}>
        {#each results as result}
            <DropdownItem on:click={() => fillInput(result)}>{result}</DropdownItem>
        {/each}
    </div>
</div>

<style>
    .dropdown-menu {
        max-width: 640px;
        width: 100%;
        bottom: 3.1em;
        border-radius: 0;
        border: 1px solid var(--accent-color);
        background: var(--background-color);
    }
</style>