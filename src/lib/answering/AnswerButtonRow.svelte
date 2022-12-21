<!-- Row containing buttons to skip a turn or submit a guess -->
<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {sGuess, sFinished} from "../stores";

    const dispatch = createEventDispatcher();

    const onSkip = () => dispatch("skip")
    const onGuess = () => dispatch("guess")
</script>

<div class="button-row">
    <button on:click={onSkip} disabled={$sGuess > 5 || $sFinished}>Skip{#if $sGuess < 5}&nbsp(+{$sGuess + 1}s){/if}</button>
    <button class="highlighted-button" on:click={onGuess} disabled={$sGuess > 6 || $sFinished}>Submit</button>
</div>

<style>
    .button-row {
        display: flex;
        justify-content: space-between;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    :global(button) {
        padding: 0.5em 1em;
        border: none;
        background: #d0dde9;
    }

    .highlighted-button {
        background: #d0021b;
        color: white;
    }
</style>