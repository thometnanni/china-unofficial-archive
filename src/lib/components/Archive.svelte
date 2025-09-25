<script>
	import { onMount } from 'svelte';
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
	let items = $state(null);

	async function fetchData() {
		item = null;
		items = null;
		if (id == null) {
			items = await query('items');
		} else {
			const resp = await query(`items/${id}`);
			item = resp;
			items = resp?.items ?? [];
		}
	}

	onMount(fetchData);

	$effect(() => {
		id;
		fetchData();
	});
</script>

<section class="grid w-svw gap-2 {id != null && `lg:grid-cols-[320px_1fr]`}">
	{#if item?.id != null}
		<Item {item} />
	{/if}
	{#if items != null}
		<Items {items} />
	{:else}
		<div class="h-40"></div>
	{/if}
</section>
