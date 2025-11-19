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
	import Loading from '$lib/components/Loading.svelte';
	import Details from '$lib/components/Details.svelte';

	let { item, seo = {} } = $derived($page.data);
</script>

<Meta title={seo.title} description={seo.description} image={seo.image} />

<MenuBar />
<Hero />
<Item {item} />

<Details />
<Archive />

<Footer />
