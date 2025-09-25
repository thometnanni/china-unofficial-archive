<script>
	import Items from '$lib/components/Items.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Search from '$lib/components/Search.svelte';

	import { page } from '$app/stores';
	import Item from '$lib/components/Item.svelte';
	import Archive from '$lib/components/Archive.svelte';
	let id = $derived($page.params.id);

	let search = $state('');
</script>

<MenuBar />
<!-- <svelte:boundary> -->
	<Search bind:value={search} />
	<Archive />
	<!-- {#snippet pending()}
		<p>loading...</p>
	{/snippet}
</svelte:boundary> -->
