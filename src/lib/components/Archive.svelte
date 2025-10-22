<script>
	import Items from '$lib/components/Items.svelte';
	import Item from '$lib/components/Item.svelte';
	import Search from './Search.svelte';
	import MediaPreview from '$lib/components/previews/MediaPreview.svelte';
	import TypeFilter from '$lib/components/TypeFilter.svelte';
	import { page } from '$app/stores';
	import { query } from '$lib/api';
	import { browser } from '$app/environment';

	let id = $derived($page.params.id);
	let item = $derived(
		await query(id == null ? `items${$page.url.search}` : `items/${id}${$page.url.search}`)
	);
	let items = $derived(item.items);

	let search = $state('');
	let medias = $derived(item?.media ?? []);

	let typeView = $state($page.url.searchParams.get('view') || 'all');

	let filteredItems = $derived(
		(items ?? []).filter((i) => (typeView === 'all' ? true : i.type === typeView))
	);

	$effect(() => {
		if (!browser) return;
		const url = new URL(window.location.href);
		const current = url.searchParams.get('view') || 'all';
		if (current !== typeView) {
			if (typeView === 'all') url.searchParams.delete('view');
			else url.searchParams.set('view', typeView);
			history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
		}
	});
</script>

<section class="grid w-svw gap-2 {id != null && `lg:grid-cols-[640px_1fr]`}">
	{#if item?.id != null}
		<Item {item} />
	{/if}

	{#if item.type === 'object'}
		<MediaPreview {medias} {item} initialIndex={0} />
	{:else}
		<div>
			<div>
				<Search bind:value={search} itemFilters={item.filters} />
				<TypeFilter bind:value={typeView} />
			</div>
			<Items items={filteredItems} />
		</div>
	{/if}
</section>
