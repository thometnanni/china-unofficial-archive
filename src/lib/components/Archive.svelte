<script>
	import Items from '$lib/components/Items.svelte';
	import Item from '$lib/components/Item.svelte';
	import Search from './Search.svelte';
	import MediaPreview from '$lib/components/previews/MediaPreview.svelte';
	import { page } from '$app/stores';
	import { query } from '$lib/api';

	let id = $derived($page.params.id);
	let pageQuery = $derived($page.query);
	let item = $derived(
		await query(id == null ? `items${$page.url.search}` : `items/${id}${$page.url.search}`)
	);
	let items = $derived(item.items);

	let search = $state('');
	let medias = $derived(item?.media ?? []);
	// console.log(item);
</script>

<section class="grid w-svw gap-2 {id != null && `lg:grid-cols-[640px_1fr]`}">
	{#if item?.id != null}
		<Item {item} />
	{/if}

	{#if item.type == 'object'}
		<MediaPreview {medias} {item} initialIndex={0} />
	{:else}
		<div>
			<Search bind:value={search} itemFilters={item.filters} />
			<Items {items} />
		</div>
	{/if}
</section>
