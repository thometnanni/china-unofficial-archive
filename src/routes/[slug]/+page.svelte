<script>
	import MenuBar from '$lib/components/MenuBar.svelte';
	import StaticPage from '$lib/components/StaticPage.svelte';
	import { page } from '$app/stores';

	$: slug = $page.params.slug;
</script>

<MenuBar />
<StaticPage {slug} />
