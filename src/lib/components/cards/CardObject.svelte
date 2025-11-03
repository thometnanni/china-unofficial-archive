<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { page } from '$app/stores';
	let { item, href } = $props();
	let isPortrait = $state(true);
	function onRatio(e) {
		isPortrait = e.detail.isPortrait;
	}
	const hasSnippets = $derived(Boolean(item?.snippets?.length));
	const dataType = $derived(
		String(item?.objectType?.[0]?.id || '')
			.toLowerCase()
			.trim()
	);
	const wrapperRows = $derived(`row-span-${hasSnippets ? 3 + (item.snippets?.length ?? 0) : 3}`);

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

<div class={`col-span-3 ${wrapperRows} grid grid-rows-[auto_1fr] gap-2`}>
	{#if hasSnippets}
		<a {href} class="grid gap-2">
			{#each item.snippets.slice(0, 3) as snippet}
				<TextOutlined as="p" class="text-xs leading-snug opacity-80"
					>{@html highlightSnippet(snippet, searchTerm)}</TextOutlined
				>
			{/each}
		</a>
	{/if}

	<a
		{href}
		class="card col-span-3 row-span-3 grid grid-cols-3 grid-rows-3 gap-8"
		data-type={dataType}
	>
		<div
			class={`${isPortrait ? 'col-[1/3] row-[1/4]' : 'col-[1/4] row-[1/3]'} border border-card-primary`}
		>
			<div class="relative h-full p-1">
				<ImageFilter
					src={item.thumbnail}
					alt={item.title}
					on:ratio={onRatio}
					fit="cover"
					objectPosition="center center"
				/>
				{#if item.objectType}
					<div class="absolute top-1 left-[calc(var(--spacing)_*_-4)] text-balance">
						{#each item.objectType as objectType}
							<TextOutlined class="mb-1 text-card-primary">{objectType.title}</TextOutlined>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		{#if item.title}
			<TextOutlined
				as="h3"
				class={isPortrait
					? 'z-0 col-[2/4] row-[1/4] mb-2 ml-4 items-end'
					: 'z-0 col-[1/4] row-[3/4] mt-[calc(var(--spacing)_*_-10)] ml-4'}
				>{item.title}</TextOutlined
			>
		{/if}
	</a>
</div>

<style>
	.card {
		--color-card-primary: var(--color-type-object);
	}
	.card[data-type='4186'] {
		--color-card-primary: var(--color-type-object-book);
	}
	.card[data-type='4187'] {
		--color-card-primary: var(--color-type-object-article);
	}
	.card[data-type='4184'] {
		--color-card-primary: var(--color-type-object-periodical);
	}
	.card[data-type='4185'] {
		--color-card-primary: var(--color-type-object-newsletter);
	}
	.card[data-type='4190'] {
		--color-card-primary: var(--color-type-object-video);
	}
	mark {
		background: var(--color-card-primary);
		color: var(--color-bg, #fff);
		padding: 0 2px;
	}
</style>
