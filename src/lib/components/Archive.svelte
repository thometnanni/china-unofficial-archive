<script>
	import Items from '$lib/components/Items.svelte';
	import Item from '$lib/components/Item.svelte';
	import Search from '$lib/components/search/Search.svelte';
	import MediaPreview from '$lib/components/previews/MediaPreview.svelte';
	import TypeFilter from '$lib/components/TypeFilter.svelte';
	import { page } from '$app/stores';
	import { query } from '$lib/api';
	import IntersectionTrigger from './IntersectionTrigger.svelte';

	let id = $derived($page.params.id ?? '');

	let items = $state(null);
	let filters = $state(null);
	let baseFilters = $state(null);
	let nextPage = $state(1);
	let hasNextPage = $state(false);
	let awaitingNextPage = $state(false);

	$effect(async () => {
		const item = await query(`query/${id}${$page.url.search}`).then((d) => d.json());
		nextPage = 2;
		items = item.items;
		filters = item.filters;
		hasNextPage = item.hasNextPage;
	});

	$effect(async () => {
		baseFilters = await query(`filters`).then((d) => d.json());
	});

	async function loadNextPage() {
		if (awaitingNextPage === true) return;

		awaitingNextPage = true;
		const item = await query(
			`query/${id}${$page.url.search}${$page.url.search ? '&' : '?'}page=${nextPage}`
		).then((d) => d.json());
		items.push(...item.items);
		hasNextPage = item.hasNextPage;
		nextPage++;
		awaitingNextPage = false;
	}

	let search = $state('');
	// let typeView = $state($page.url.searchParams.get('view') || 'all');
	// let filteredItems = $derived(
	// 	(items ?? []).filter((i) => (typeView === 'all' ? true : i.type === typeView))
	// );

	// $effect(() => {
	// 	if (id != null && !$page.url.searchParams.has('view')) typeView = 'all';
	// });

	// $effect(() => {
	// 	const u = new URL(window.location.href);
	// 	const current = u.searchParams.get('view') || 'all';
	// 	if (current !== typeView) {
	// 		if (typeView === 'all') u.searchParams.delete('view');
	// 		else u.searchParams.set('view', typeView);
	// 		history.replaceState({}, '', `${u.pathname}${u.search}${u.hash}`);
	// 	}
	// });

	// let hasActiveFilters = $derived(
	// 	Object.values(item?.filters ?? {}).some(
	// 		(category) => Object.values(category).reduce((sum, count) => sum + count, 0) > 0
	// 	)
	// );
</script>

{#if items?.length && baseFilters}
	<section>
		<div>
			<div>
				<Search bind:value={search} itemFilters={filters} {baseFilters} />
				<!-- <TypeFilter bind:value={typeView} /> -->
			</div>
			<Items {items} />
		</div>
	</section>
	{#if hasNextPage}
		<IntersectionTrigger on:visible={loadNextPage} />
	{/if}
{/if}
