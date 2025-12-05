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

	let items = $state([]);
	let filters = $state(null);
	let baseFilters = $state(null);
	let nextPage = $state(2);
	let hasNextPage = $state(false);
	let awaitingNextPage = $state(false);
	let typeCounts = $state({ objects: 0, creators: 0 });

	$effect(async () => {
		const item = await query(`query/${id}${$page.url.search}`).then((d) => d.json());
		nextPage = 2;
		items = item.items;
		filters = item.filters;
		hasNextPage = item.hasNextPage;
		typeCounts = item.counts;
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

		const ids = items.map(({ id }) => id);
		items.push(...item.items.filter(({ id }) => !ids.includes(id)));
		hasNextPage = item.hasNextPage;
		nextPage++;
		awaitingNextPage = false;
	}

	let search = $state('');

	// let displayItems = $derived.by(() => {
	// 	const showCreators = $page.url.searchParams.get('view') === 'creator';
	// 	console.log(showCreators);
	// 	return items.filter(({ type }) => (type === 'creator') !== showCreators);
	// });

	// let displayItems = $state(null);

	// $effect(() => {
	// 	const showCreators = $page.url.searchParams.get('view') === 'creator';
	// 	console.log(showCreators);
	// 	displayItems = items.filter(({ type }) => (type !== 'creator') === showCreators);

	// 	$inspect(displayItems);
	// });

	let displayItems = $derived.by(() => {
		const itemType = $page.url.searchParams.get('view') === 'creator' ? 'creator' : 'object';
		return items.filter(({ type }) => itemType === type);
	});
</script>

{#if items && baseFilters}
	<section class="m-auto max-w-[1640px]">
		<div>
			<div>
				<Search bind:value={search} itemFilters={filters} {baseFilters} />
				<TypeFilter objectCount={typeCounts.objects} creatorCount={typeCounts.creators} />
			</div>
			<Items items={displayItems} />
		</div>
	</section>
	{#if hasNextPage}
		<IntersectionTrigger on:visible={loadNextPage} />
	{/if}
{/if}
