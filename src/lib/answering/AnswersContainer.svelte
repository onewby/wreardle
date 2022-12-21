<script lang="ts">
    import {MinusIcon, CheckIcon, XIcon} from "svelte-feather-icons";
    import Answer from "./Answer.svelte";
    import {sGuess, sGuesses, sSuccess} from "../stores.ts";
    import {onDestroy} from "svelte";

    let guesses: (string | undefined)[] = [...Array(6).keys()].map(() => undefined)
    sGuesses.forEach((w, i) => onDestroy(w.subscribe(value => guesses[i] = value)))
</script>

<div class="main-container-outer">
    <div class="main-container-inner">
        {#each guesses as guess, i}
            <Answer placeholder={guess}>
                <div slot="prefix">
                    {#if guess !== undefined}
                        {#if guess === "Skipped"}
                            <MinusIcon class="answer-skipped" />
                        {:else if $sSuccess && $sGuess === i}
                            <CheckIcon class="answer-correct" />
                        {:else}
                            <XIcon class="answer-incorrect" />
                        {/if}
                    {/if}
                </div>
            </Answer>
        {/each}
    </div>
</div>


<style>
    :global(.main-container-inner) {
        max-width: 640px;
        display: block;
        width: 100%;
    }

    :global(.main-container-outer) {
        display: flex;
        justify-content: center;
    }

    :global(.accepted[disabled]) {
        -webkit-appearance: none;
        -webkit-text-fill-color: var(--text-color);
        opacity: 1;
    }

    :global(.feather.answer-correct) {
        color: var(--correct-color);
    }

    :global(.feather.answer-incorrect) {
        color: var(--incorrect-color);
    }

    :global(.feather.answer-skipped) {
        color: var(--tertiary-color);
    }
</style>