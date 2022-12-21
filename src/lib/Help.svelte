<!-- Modal dialog with "how to play" information -->
<script>
    import {Modal, ModalBody, ModalHeader} from "sveltestrap";
    import {PlayCircleIcon, MusicIcon, SpeakerIcon, SearchIcon, ThumbsUpIcon} from "svelte-feather-icons";
    import {browser} from "$app/environment";

    // Is this dialog open?
    export let open = false
    // Toggle the dialog showing - if it is being closed for the first time, don't show on page load again
    const toggle = () => {
        open = !open;
        if(!open && browser) {
            localStorage.setItem("howToPlay", "true")
        }
    }

    const iconSize = "24"
</script>

<Modal fade={true} isOpen={open} {toggle} contentClassName={"popup"}>
    <ModalHeader {toggle}>How to Play</ModalHeader>
    <ModalBody>
        <w-help>
            <MusicIcon size={iconSize} />
            <w-content>Press <PlayCircleIcon/> to listen to the intro of a WWE theme song.</w-content>
        </w-help>
        <w-help>
            <SearchIcon size={iconSize} />
            <w-content>Find the correct song in the list - you can search by theme title, artist and wrestler.</w-content>
        </w-help>
        <w-help>
            <SpeakerIcon size={iconSize} />
            <w-content>Skipped or incorrect attempts unlock more of the song.</w-content>
        </w-help>
        <w-help>
            <ThumbsUpIcon size={iconSize} />
            <w-content>Answer in as few tries as possible and share your score!</w-content>
        </w-help>
        <div>
            <button on:click={toggle}>Play!</button>
        </div>
    </ModalBody>
</Modal>

<style>
    w-help {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    w-help:first-child {
        margin-top: 0;
    }

    w-help:last-child {
        margin-bottom: 0;
    }

    :global(w-help > .feather) {
        flex: 0 0 36px;
        margin-right: 1em;
    }

    w-content {
        flex: 1 1 auto;
    }

    div {
        width: 100%;
        text-align: center;
        margin-top: 1.5em;
    }
</style>