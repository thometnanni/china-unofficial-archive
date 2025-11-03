<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { page } from '$app/stores';
	let { item, href } = $props();
	const hasSnippets = $derived(Boolean(item?.snippets?.length));

	const wrapperRows = $derived(`row-span-${hasSnippets ? 6 + (item.snippets?.length ?? 0) : 4}`);

	const searchTerm = $derived(String($page.url.searchParams.get('search') || '').trim());
	function escapeRegex(s) {
		return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
	function escapeHtml(s) {
		return String(s).replace(
			/[&<>"']/g,
			(m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]
		);
	}
	function highlightSnippet(s, q) {
		if (!q) return escapeHtml(s);
		const terms = Array.from(new Set(q.split(/\s+/).filter(Boolean)));
		if (!terms.length) return escapeHtml(s);
		const re = new RegExp('(' + terms.map(escapeRegex).join('|') + ')', 'gi');
		return escapeHtml(s).replace(re, '<mark>$1</mark>');
	}
</script>

<div class={`col-span-4 ${wrapperRows} grid grid-rows-[auto_1fr] gap-2`}>
	{#if hasSnippets}
		<a {href} class="grid gap-2">
			{#each item.snippets.slice(0, 3) as snippet}
				<TextOutlined as="p" class="text-xs leading-snug opacity-80"
					>{@html highlightSnippet(snippet, searchTerm)}</TextOutlined
				>
			{/each}
		</a>
	{/if}

	<a {href} class="card col-span-4 row-span-4 border border-card-primary">
		<div class="relative h-full p-1">
			<ImageFilter
				src={item.thumbnail}
				color="var(--color-card-primary)"
				fit="cover"
				objectPosition="center 35%"
			/>
			<TextOutlined
				as="h3"
				class="absolute right-[calc(var(--spacing)_*_-4)] bottom-4 text-right text-xl"
				>{item.title}</TextOutlined
			>
		</div>
	</a>
</div>

<style>
	.card {
		--color-card-primary: var(--color-type-creator);
	}
	mark {
		background: var(--color-card-primary);
		color: var(--color-bg, #fff);
		padding: 0 2px;
	}
</style>
