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
	let item = $derived(await query(id == null ? `items` : `items/${id}`));
	let items = $derived(item?.items);
</script>

<section class="grid w-svw gap-2 {id != null && `lg:grid-cols-[320px_1fr]`}">
	{#if item.id != null}
		<Item {item} />
	{/if}
	{#if items != null}
		<Items {items} />
	{/if}
</section>
