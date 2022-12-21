<!-- Bar chart detailing number of wins in n turns -->
<script lang="ts">
    // Labels for each bar on the bar chart
    export let labels: string[] = []
    // Numeric values for each bar on the bar chart
    export let values: number[] = []

    // Total number of wins (calculated by adding up number of wins in n turns for all n)
    $: max = values.reduce((prev, curr) => Math.max(prev, curr), 0)
    // Calculate number of wins in n turns as a % of total wins
    $: percents = values.map(val => val === 0 ? "0" : ((val / max) * 100).toFixed(2))
</script>

<div class="chart" {...$$restProps}>
    {#each values as value, i}
        <div class="chart-row">
            <div class="chart-label">{labels[i] ?? ""}</div>
            <div class="chart-bar" style="width: {percents[i]}%;" class:hide={value === 0}>{value}</div>
        </div>
    {/each}
</div>

<style>
    .chart {
        display: flex;
        flex-direction: column;
    }

    .chart-bar {
        background: var(--accent-color);
        color: var(--text-color);
        font-size: small;
        padding-left: 1em;
        display: flex;
        align-items: center;
    }

    .chart-row {
        display: flex;
        flex-direction: row;
        padding-top: 0.1em;
        padding-bottom: 0.1em;
    }

    .chart-label {
        width: 1.5em;
    }

    .hide {
        display: none;
    }
</style>