<script>
	import Items from '$lib/components/Items.svelte';
	import Item from '$lib/components/Item.svelte';
	import Search from './Search.svelte';
	import MediaPreview from '$lib/components/previews/MediaPreview.svelte';
	import TypeFilter from '$lib/components/TypeFilter.svelte';
	import { page } from '$app/stores';
	import { query } from '$lib/api';

	let id = $derived($page.params.id ?? '');

	const { items, filters } = $derived(await query(`query/${id}`).then((d) => d.json()));

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

{#if items?.length}
	<section>
		<div>
			<div>
				<Search bind:value={search} itemFilters={filters} />
				<!-- <TypeFilter bind:value={typeView} /> -->
			</div>
			<Items {items} />
		</div>
	</section>
{/if}
