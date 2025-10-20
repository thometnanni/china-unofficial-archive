<script>
	import { onMount } from 'svelte';
	import Items from '$lib/components/Items.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import { page } from '$app/stores';

	import Item from '$lib/components/Item.svelte';
	import { query } from '$lib/api';

	let id = $derived($page.params.id);

	let item = $derived(await query(id == null ? 'items' : `items/${id}`));
	let items = $derived(item.items);
</script>

<section class="grid w-svw gap-2 {id != null && `lg:grid-cols-[640px_1fr]`}">
	{#if item?.id != null}
		<Item {item} />
	{/if}
	{#if items != null && items.length > 0}
		<Items {items} />
	{/if}
	{#if item?.media?.[0]?.type === 'application/pdf'}
		<Preview media={item?.media[0]} />
	{/if}
</section>
