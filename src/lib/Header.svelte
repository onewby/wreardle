<!-- Page header, with the site title and navigation icons -->
<script lang="ts">
    import {InfoIcon, GithubIcon, BarChartIcon, HelpCircleIcon} from "svelte-feather-icons";
    import {Navbar} from "sveltestrap";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher()
</script>

<div class="header">
    <Navbar color="dark" expand="md" dark={true}>
        <div class="header-internal">
            <a href="##" role="button" on:click={() => dispatch("info")}><InfoIcon fill="white"/></a>
            <a href="https://github.com/onewby" role="button"><GithubIcon fill="white"/></a>
            <div class="nav-wreardle"><a class="navbar-brand text-xl-center" href="##">Wr<span class="nav-eardle">eardle</span></a></div>
            <a href="##" role="button" on:click={() => dispatch("stats")}><BarChartIcon fill="white"/></a>
            <a href="##" role="button" on:click={() => dispatch("help")}><HelpCircleIcon fill="white"/></a>
        </div>
    </Navbar>
</div>

<style>
    .header {
        text-align: center;
        border-bottom: 1px solid var(--text-color);
    }

    /* Set up inside of the header to contain items and fit the page width */
    .header-internal {
        width: 100%;
        max-width: 640px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Give icons proper padding */
    :global(.header-internal a:first-child) {
        margin-right: 1rem;
    }

    :global(.header-internal a:last-child) {
        margin-left: 1rem;
    }

    /* Move icons to the edge of the page */
    .nav-wreardle {
        flex: 1 1 auto;
    }

    /* Ensure the title is properly centred */
    :global(.navbar-brand) {
        margin-right: 0;
    }

    :global(.header .container-fluid) {
        justify-content: center !important;
    }

    /* Title formatting */
    .text-xl-center {
        font-size: 1.75em;
        font-weight: 500;
    }

    .nav-eardle {
        color: var(--tertiary-color);
    }
</style>