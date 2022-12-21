<!-- Song time elapsed bar at the bottom of the page. Fills as the song progresses.
     Contains "notches" proportional to the additional playtime provided in each turn. -->
<script lang="ts">
    import {sGuesses, sMusicProgress, sPlayTime} from "../stores.ts";

    // Calculate the current time elapsed in seconds as a % of total time possible to be elapsed
    const pctPlayTime = (playTime: number) => ((playTime / 16) * 100).toFixed(3)
</script>

<div class="w-pb">
    <div class="w-pb-left w-pb-edge"></div>
    <div class="w-pb-central" style="background-size: {pctPlayTime($sMusicProgress / 1000)}% 100%, {pctPlayTime($sPlayTime)}% 100%, 100%">
        {#each sGuesses as _, i}
            <div class="w-pb-s" style="flex-grow:{Math.max(1, i)}"></div>
        {/each}
    </div>
    <div class="w-pb-right w-pb-edge"></div>
</div>

<style>
    .w-pb {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-bottom: 0.75em;
        align-items: center;
        justify-content: center;
    }

    .w-pb-central {
        max-width: 640px;
        width: 100%;
        flex: 0 1 auto;
        display: flex;
        flex-direction: row;
        border: 0.5px solid var(--text-color);
        background-repeat: no-repeat;
        background-image: linear-gradient(var(--accent-color), var(--accent-color)), linear-gradient(var(--tertiary-color), var(--tertiary-color)), linear-gradient(var(--background-color), var(--background-color));
        background-size: 0 100%, 6.25% 100%, 100%;
    }

    .w-pb-edge {
        height: 1px;
        flex: 1 0 0;
        min-width: 0;
        border-bottom: 1px solid var(--text-color);
    }

    .w-pb-s {
        display: block;
        border: 0.5px solid var(--text-color);
        height: 1em;
    }
</style>