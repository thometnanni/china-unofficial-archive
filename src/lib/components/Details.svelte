<script>
	import { query } from '$lib/api';
	import { page } from '$app/stores';
	import HtmlPreview from './previews/HtmlPreview.svelte';
	import MediaPreview from './previews/MediaPreview.svelte';

	let id = $derived($page.params.id);

	let promise = $derived(id && query(`item-details/${id}`));

	const { html, media } = $derived((await promise).json());
</script>

{#if html}
	<HtmlPreview media={html} />
{/if}
{#if media}
	<MediaPreview medias={media} />
{/if}
