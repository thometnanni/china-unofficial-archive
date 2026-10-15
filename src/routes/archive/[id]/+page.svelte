<script>
	import MenuBar from '#lib/components/MenuBar.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { page } from '$app/state';
	import Item from '#lib/components/Item.svelte';
	import Archive from '#lib/components/Archive.svelte';
	import Meta from '#lib/components/Meta.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Details from '#lib/components/Details.svelte';

	let { item, seo = {} } = $derived(page.data);
</script>

<Meta title={seo.title} description={seo.description} image={seo.image} />

<MenuBar />
<Hero />
<Item {item} />

<Details />
<Archive />

<Footer />
