<script>
  export let value = "";
  export let lang;
  import { t } from "$lib/lang.js";
</script>

<input
  type="text"
  class="search-input"
  bind:value
  placeholder={t("search_placeholder", lang)}
/>

<style>
  .search-input {
    margin-bottom: 1.2em;
    padding: 0.5em;
    font-size: 1em;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #ddd;
  }
</style>
