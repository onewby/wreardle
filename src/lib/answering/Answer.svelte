<!-- Row item for guesses - used to both detail previous guesses and act as a guess input
     Contains "prefix" and "suffix" slots for icons before and after the input text -->
<script lang="ts">
    // Input placeholder text
    export let placeholder = "";
    // Input disabled
    export let disabled = true;
    // Input value
    export let value = "";
    // Extra classes on the input element
    let clazz = "";
    export {clazz as class};
</script>

<div class="answer-wrapper">
    <span class="search-icon search-icon-prefix"><slot name="prefix"></slot></span>
    <input class="heardle-input {clazz}"
           class:has-prefix={$$slots.prefix}
           disabled={disabled}
           placeholder={placeholder || null}
           bind:value={value}
           on:focus on:input on:blur
           {...$$restProps}>
    <span class="search-icon search-icon-suffix"><slot name="suffix"></slot></span>
</div>

<style>
    .heardle-input {
        width: 100%;
        background: var(--background-color);
        border: 1px solid var(--text-color);
        color: white;
        margin-top: 0.75em;
        padding: 0.75em 1em;
    }

    .answer-wrapper {
        position: relative;
    }

    .search-icon {
        position: absolute;
    }

    .search-icon-prefix {
        top: 1.5em;
        left: 1em;
    }

    .search-icon-suffix {
        top: 1.42em;
        right: 1em;
    }

    .has-prefix {
        padding-left: calc(1.5em + 24px) !important;
    }

    input:focus {
        outline: none;
        border-color: var(--accent-color);
    }
</style>