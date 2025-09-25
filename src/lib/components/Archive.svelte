<script>
	import Items from '$lib/components/Items.svelte';
	import { page } from '$app/stores';

	import Item from '$lib/components/Item.svelte';
	import { query } from '$lib/api';

	let id = $derived($page.params.id);

	// let item = $state(null);
	// let items = $state(null);

	// $effect(async () => {
	// 	item = null;
	// 	items = null;
	// 	if (id == null) {
	// 		items = await query(`items`);
	// 		return;
	// 	}
	// 	item = await query(`item/${id}`);
	// 	items = item.items;
	// });
	let item = $state(null);
	let items = $state([]);

	async function fetchData() {
		item = null;
		items = [];

		const resp = await query(id == null ? 'items' : `items/${id}`);

		if (id == null) {
			items = Array.isArray(resp) ? resp : (resp?.items ?? []);
		} else {
			item = resp ?? null;
			items = resp?.items ?? [];
		}
	}

	$effect(fetchData);
</script>

<section class="grid w-svw gap-2 {id != null && `lg:grid-cols-[520px_1fr]`}">
	{#if item}
		<Item {item} />
	{/if}
	{#if items.length}
		<Items {items} />
	{:else}
		<div class="h-40"></div>
	{/if}
</section>
