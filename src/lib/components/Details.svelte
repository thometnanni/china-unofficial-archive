<script>
	import { page } from '$app/stores';
	import HtmlPreview from '$lib/components/previews/HtmlPreview.svelte';
	import MediaPreview from '$lib/components/previews/MediaPreview.svelte';

	let item = $derived($page.data.item);
</script>

{#if item.html}
	<HtmlPreview media={item.html} />
{/if}
{#if item.media}
	<MediaPreview medias={item.media} />
{/if}
