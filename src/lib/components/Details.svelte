<script>
	import { query } from '$lib/api';
	import { page } from '$app/stores';
	import HtmlPreview from './previews/HtmlPreview.svelte';
	import MediaPreview from './previews/MediaPreview.svelte';

	let id = $derived($page.params.id);

	let html = $state(null);
	let media = $state(null);

	$effect(async () => {
		if (id == null) return;
		const item = await query(`item-details/${id}`).then((d) => d.json());

		html = item.html;
		media = item.media;
	});
</script>

{#if html}
	<HtmlPreview media={html} />
{/if}
{#if media}
	<MediaPreview medias={media} />
{/if}
