<script>
	import Items from '$lib/components/Items.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Search from '$lib/components/Search.svelte';

	import { page } from '$app/stores';
	import Item from '$lib/components/Item.svelte';
	let id = $derived($page.params.id);

	let search = $state('');
</script>

<MenuBar />
<svelte:boundary>
	<Search bind:value={search} />
	<section class="grid w-svw gap-2 lg:grid-cols-[320px_1fr]">
		{#if id != null}
			<Item {id} />
		{/if}
		<Items />
	</section>
	{#snippet pending()}
		<p>loading...</p>
	{/snippet}
</svelte:boundary>
