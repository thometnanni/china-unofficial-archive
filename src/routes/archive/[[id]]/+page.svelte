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
	import Meta from '$lib/components/Meta.svelte';
	import Hero from '$lib/components/Hero.svelte';
	let { data } = $props();
</script>

<Meta title={data.seo.title} description={data.seo.description} image={data.seo.image} />

<main class="min-h-screen">
	<MenuBar />
	<Hero />
	<svelte:boundary>
		<Archive item={data.item} />
		{#snippet pending()}
			<div class="border-t">
				<p>{m.loading()}</p>
			</div>
		{/snippet}
	</svelte:boundary>
</main>
<Footer />
