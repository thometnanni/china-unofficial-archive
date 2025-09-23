<script>
	import Items from '$lib/components/Items.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Search from '$lib/components/Search.svelte';

	let search = $state('');
</script>

<MenuBar />
<svelte:boundary>
	<Search bind:value={search} />
	<Items />
	{#snippet pending()}
		<p>loading...</p>
	{/snippet}
</svelte:boundary>
