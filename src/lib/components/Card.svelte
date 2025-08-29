<script>
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';
	import { buildSnippetParts } from '$lib/text-utils.js';

	const { item, zoom, search = '' } = $props();

	let lang = $derived(getLocale());
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

	let snip = $derived.by(() => {
		const q = (search ?? '').trim();
		return q ? buildSnippetParts(item, q, 140, 3) : { snippets: [], source: null };
	});
</script>

<a class="card" href={`/items/${itemId}`}>
	{#if thumbUrl && zoom >= 2}
		<img class="thumb" src={thumbUrl} alt="thumbnail" />
	{/if}
	<div class="content">
		<div class="title">{title}</div>

		{#if zoom >= 3}
			{#if snip.snippets.length}
				{#each snip.snippets as parts}
					<div class="snippet">
						{#each parts as p}
							{#if p.hit}<mark>{p.hit}</mark>{:else}{p.text}{/if}
						{/each}
					</div>
				{/each}
				<div class="desc">{desc}</div>
			{/if}
		{/if}
	</div>
</a>

<style>
	.card {
		display: flex;
		align-items: flex-start;
		gap: 1em;
		padding: 0.7em;
		min-height: 56px;
		border-bottom: 1px solid #eee;
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
		font-weight: 600;
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
	.snippet {
		margin-top: 0.25rem;
		font-size: 0.95em;
		line-height: 1.35;
		color: #444;
		white-space: pre-wrap;
	}
	mark {
		padding: 0 0.15em;
		border-radius: 0.2em;
	}
</style>
