<script>
	import Items from '$lib/components/Items.svelte';
	import Item from '$lib/components/Item.svelte';
	import Search from './Search.svelte';
	import MediaPreview from '$lib/components/previews/MediaPreview.svelte';
	import TypeFilter from '$lib/components/TypeFilter.svelte';
	import { page } from '$app/stores';

	let { item } = $props();

	let id = $derived($page.params.id);
	let items = $derived(item.items);
	let search = $state('');
	let medias = $derived(item?.media ?? []);
	let typeView = $state($page.url.searchParams.get('view') || 'all');
	let filteredItems = $derived(
		(items ?? []).filter((i) => (typeView === 'all' ? true : i.type === typeView))
	);

	$effect(() => {
		if (id != null && !$page.url.searchParams.has('view')) typeView = 'all';
	});

	$effect(() => {
		const u = new URL(window.location.href);
		const current = u.searchParams.get('view') || 'all';
		if (current !== typeView) {
			if (typeView === 'all') u.searchParams.delete('view');
			else u.searchParams.set('view', typeView);
			history.replaceState({}, '', `${u.pathname}${u.search}${u.hash}`);
		}
	});

	let hasActiveFilters = $derived(
		Object.values(item?.filters ?? {}).some(
			(category) => Object.values(category).reduce((sum, count) => sum + count, 0) > 0
		)
	);
</script>

<section class="grid w-svw gap-2 {id != null && `lg:grid-cols-[640px_1fr]`}">
	{#if item?.id != null}
		<Item {item} />
	{/if}

	{#if item.type === 'object'}
		<MediaPreview {medias} {item} initialIndex={0} />
	{:else}
		<div>
			{#if items?.length > 2 || hasActiveFilters}
				<div>
					<Search bind:value={search} itemFilters={item.filters} />
					<TypeFilter bind:value={typeView} />
				</div>
			{/if}
			<Items items={filteredItems} />
		</div>
	{/if}
</section>
