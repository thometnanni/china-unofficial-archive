<script>
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';

	const { item, zoom } = $props();

	let lang = $derived.by(getLocale);

	let title = $derived(
		item['dcterms:title']?.find((ti) => ti['@language'] === lang)?.['@value'] ||
			item['o:title'] ||
			m.untitled()
	);

	let desc = $derived(
		item['dcterms:description']?.find((di) => di['@language'] === lang)?.['@value'] ||
			item['dcterms:description']?.[0]?.['@value'] ||
			m.no_description()
	);

	let thumbUrl = $derived(
		item.thumbnail_display_urls?.medium || item.thumbnail_display_urls?.large || ''
	);

	let itemId = $derived(item['o:id']);
</script>

<a class="card" href={`/items/${itemId}`}>
	{#if thumbUrl && zoom >= 2}
		<img class="thumb" src={thumbUrl} alt="thumbnail" />
	{/if}
	<div class="content">
		<div class="title">{title}</div>
		{#if zoom >= 3}
			<div class="desc">{desc}</div>
		{/if}
	</div>
</a>

<style>
	.card {
		display: flex;
		align-items: flex-start;
		padding: 0.7em;
		border-bottom: 1px solid #eee;
		gap: 1em;
		min-height: 56px;
		text-decoration: none;
		color: inherit;
		transition: background 0.2s;
	}

	.card:hover {
		background: #f9f9f9;
	}

	.thumb {
		width: 56px;
		height: 56px;
		object-fit: cover;
		border-radius: 8px;
		background: #f3f3f3;
	}

	.content {
		flex: 1;
	}

	.title {
		font-weight: bold;
		font-size: 1.06em;
		margin-bottom: 0.2em;
	}

	.desc {
		color: #666;
		font-size: 0.98em;
		line-height: 1.32;
		max-height: 2.7em;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
