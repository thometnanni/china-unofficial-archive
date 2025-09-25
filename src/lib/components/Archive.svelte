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
	let items = $state([]);

	async function fetchData(cur) {
		item = null;
		items = null;

		const resp = await query(cur == null ? 'items' : `items/${cur}`);

		if (cur !== id) return;

		if (cur == null) {
			items = Array.isArray(resp) ? resp : (resp?.items ?? []);
		} else {
			item = resp ?? null;
			items = resp?.items ?? [];
		}
	}

	onMount(() => fetchData(id));

	$effect(() => {
		id;
		fetchData(id);
	});
</script>


<section class="grid w-svw gap-2 {id != null && `lg:grid-cols-[640px_1fr]`}">
	{#if item?.id != null}
		<Item {item} />
	{/if}
	{#if items != null}
		<Items {items} />
	{/if}
</section>
