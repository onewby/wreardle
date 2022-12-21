<!-- Modal dialog with information about the site -->
<script>
    import {Modal, ModalBody, ModalHeader} from "sveltestrap";

    export let open = false
    const toggle = () => open = !open
</script>

<Modal fade={true} isOpen={open} {toggle} contentClassName={"popup"}>
    <ModalHeader {toggle}>Information</ModalHeader>
    <ModalBody>
        <p>Yet another Heardle clone for guessing WWE themes.</p>
        <p>Songs played using <a href="https://soundcloud.com">Soundcloud</a>.
            UI inspired by <a href="https://www.spotify.com/heardle/">Heardle</a>,
            <a href="https://2000sheardle.glitch.me">2000's Heardle</a> and
            <a href="https://lyricle.app">Lyricle</a>.
            Data on wrestlers' themes sourced from <a href="https://www.cagematch.net">Cagematch</a>.
            This site is not affiliated with WWE in any form.</p>
        <div class="text-center">
            <p class="created-by">Created by</p>
            <a href="https://onewby.me"><img src="https://onewby.me/img/logo.svg" alt="Oliver Newby"></a>
        </div>
    </ModalBody>
</Modal>

<style>
    img {
        height: 2em;
    }

    .created-by {
        font-size: smaller;
        margin-bottom: 0.5em;
    }
</style>