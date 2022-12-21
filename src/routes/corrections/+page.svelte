<!-- UI to perform corrections for the song scraper.
     Not accessible in production - only using npm run dev. -->
<script lang="ts">
    import {Alert, Navbar, NavbarBrand, NavItem, NavLink} from "sveltestrap";
    import type {PageData} from "./$types";
    import {sChanges, sSongIndex} from "./stores";
    import type {Song} from "../../types/song.type";
    import {derived, type Readable} from "svelte/store";

    // Contains a list of songs being reviewed and a list of songs that have been confirmed/successfully found
    export let data: PageData
    // Bound to the text box for "Get ID from URL"
    let soundcloudURL = ""
    // Shows the alert box for an error fetching the Soundcloud URL
    let alertOpen = false

    // Current song being reviewed
    const song: Readable<Song> = derived(sSongIndex, i => data.reviewSongs[i])
    // JSON list combining confirmed songs and edits
    const changesHref: Readable<string> = derived(sChanges, changes => {
        const allSongs = [...data.confirmedSongs, ...changes]
        const songsJSON = JSON.stringify(allSongs)
        return URL.createObjectURL(new Blob([songsJSON], {type: "application/json"}))
    })

    /* Event handlers */

    // On "Get ID by URL" button click
    async function onGetID() {
        let idResp = await fetch("/soundcloud", {method: "post", body: JSON.stringify({"url": soundcloudURL})})
        if(idResp.status !== 200) {
            alertOpen = true
        } else {
            let id = (await idResp.json()).id
            $song.soundcloudID = Number(id)
        }
    }

    const onGoBack = () => sSongIndex.update(i => i - 1)
    const onReturnStart = () => sSongIndex.set(0)
    const onSkipSong = () => sSongIndex.update(i => i + 1)

    function onSaveSong() {
        $sChanges = [...$sChanges, $song]
        onSkipSong()
    }

</script>

<svelte:head>
    <title>songs.json corrections</title>
</svelte:head>

<body>
    <Navbar color={"light"}>
        <div class="width-limited d-flex nav-internal">
            <NavbarBrand>songs.json corrections</NavbarBrand>
            <div class="navbar-nav d-flex flex-row status">
                <!-- Download button -->
                <NavItem class="me-4">
                    <NavLink href={$changesHref} download="songs.new.json">Download</NavLink>
                </NavItem>
                <!-- Back button (return to previous song) -->
                {#if $sSongIndex > 0}
                    <button type="button" class="btn btn-light me-2" on:click={onGoBack}>←</button>
                {/if}
                <!-- Progress indicator (e.g. 23/105) -->
                {$sSongIndex + 1}/{data.reviewSongs.length}
            </div>
        </div>
    </Navbar>
    <div class="d-flex flex-column primary-container width-limited">
        {#if data.reviewSongs.length === 0}
            <p>No songs could be found.</p>
        {:else if $sSongIndex + 1 === data.reviewSongs.length}
            <p>All songs have been corrected.</p>
            <div class="d-flex button-row gap-2">
                <button type="button" class="btn btn-primary" on:click={onReturnStart}>Return to start</button>
            </div>
        {:else}
            <!-- Song being checked -->
            <iframe title="Correct song" width="100%" height="166" scrolling="no" frameborder="no" class="mb-3 mt-3"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{$song.soundcloudID}&buying=false&sharing=false&show_playcount=false&show_user=false&download=false">
            </iframe>
            <form>
                <!-- Artist/song/wrestler details -->
                <div class="d-flex">
                    <div class="form-floating mb-3 flex-fill">
                        <input type="text" readonly class="form-control-plaintext" id="songName" value={$song.title}>
                        <label for="songName">Name</label>
                    </div>
                    <div class="form-floating mb-3 flex-fill">
                        <input type="text" readonly class="form-control-plaintext" id="songArtist" value={$song.artist}>
                        <label for="songArtist">Artist</label>
                    </div>
                    <div class="form-floating mb-3 flex-fill">
                        <input type="text" readonly class="form-control-plaintext" id="songWrestlers" value={$song.wrestlers.join(", ")}>
                        <label for="songWrestlers">Wrestler(s)</label>
                    </div>
                </div>
                <!-- Soundcloud ID -->
                <label for="soundcloudID" class="form-label">Soundcloud ID</label>
                <div class="d-flex">
                    <div class="mb-1 me-2">
                        <input type="number" class="form-control" id="soundcloudID" bind:value={$song.soundcloudID}>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="soundcloudURL" placeholder="URL" bind:value={soundcloudURL}>
                        <button type="button" class="btn btn-outline-secondary" on:click={onGetID}>Get ID from URL</button>
                    </div>
                </div>
                <!-- Save/skip options -->
                <div class="d-flex button-row gap-2">
                    <button type="button" class="btn btn-primary" on:click={onSaveSong}>Save to songs.json</button>
                    <button type="button" class="btn btn-danger" on:click={onSkipSong}>Ignore</button>
                </div>
            </form>
            <!-- Error alert -->
            <Alert fade={true} color={"danger"} dismissible={true} isOpen={alertOpen} toggle={() => alertOpen = !alertOpen}>
                A Soundcloud ID could not be found from this URL.
            </Alert>
        
        {/if}
    </div>
</body>

<style>
    .width-limited {
        max-width: 640px;
    }

    .nav-internal {
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .primary-container {
        margin-left: auto;
        margin-right: auto;
    }

    .button-row button {
        width: 100%;
    }

    .status {
        align-items: center;
    }
</style>