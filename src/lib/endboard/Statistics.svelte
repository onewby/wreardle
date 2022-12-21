<!-- Statistics window detailing tries, wins and win streaks -->
<script lang="ts">
    import Statistic from "./Statistic.svelte";
    import {sTries, sCurrentStreak, sSuccessRate, sMaximumStreak} from "../stores";
</script>

<div class="stats">
    <Statistic title="Tries" value="{$sTries}"/>
    <Statistic title="Success Rate" value={isNaN($sSuccessRate) ? '-' : `${Math.round($sSuccessRate * 100).toFixed(0)}%`} />
    <Statistic title="Current Streak" value={$sCurrentStreak}/>
    <Statistic title="Maximum Streak" value={$sMaximumStreak}/>
</div>

<style>
    .stats {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>