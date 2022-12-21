<!-- Individual statistic in the row of win statistics -->
<script lang="ts">
    export let title = "";
    export let value = "";
</script>

<div class="stat" {...$$restProps}>
    <div class="stat-value h2">{value}</div>
    <div class="stat-title">{title}</div>
</div>

<style>
    .stat {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
    }

    .stat-title {
        font-size: small;
    }
</style>