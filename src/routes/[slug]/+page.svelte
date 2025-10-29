<script>
	import MenuBar from '$lib/components/MenuBar.svelte';
	import StaticPage from '$lib/components/StaticPage.svelte';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';

	$: slug = $page.params.slug;
</script>

<MenuBar />
<StaticPage {slug} />
<Footer />
