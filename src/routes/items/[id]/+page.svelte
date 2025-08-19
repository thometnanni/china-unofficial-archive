<script>
  import { onMount } from "svelte";
  import { getItem } from "$lib/api";
  import { page } from "$app/stores";

  let item;
  let loading = true;

  $: id = $page.params.id;

  onMount(async () => {
    try {
      item = await getItem(id);
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Loading item…</p>
{:else if item}
  <h1>{item["o:title"]}</h1>
  <pre>{JSON.stringify(item, null, 2)}</pre>
{:else}
  <p>Item not found.</p>
{/if}
