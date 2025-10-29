<script>
	import Items from '$lib/components/Items.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Search from '$lib/components/Search.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { m } from '$lib/paraglide/messages';

	import { page } from '$app/stores';
	import Item from '$lib/components/Item.svelte';
	import Archive from '$lib/components/Archive.svelte';
	let id = $derived($page.params.id);

	let search = $state('');
</script>

<main class="min-h-screen">
	<MenuBar />
	<svelte:boundary>
		<Archive />
		{#snippet pending()}
			<div class="border-t">
				<p>{m.loading()}</p>
			</div>
		{/snippet}
	</svelte:boundary>
</main>
<Footer />
