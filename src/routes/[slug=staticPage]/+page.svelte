<script>
	import MenuBar from '$lib/components/MenuBar.svelte';
	import StaticPage from '$lib/components/StaticPage.svelte';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import { m } from '$lib/paraglide/messages';
	import Meta from '$lib/components/Meta.svelte';
	let slug = $derived($page.params.slug);
	let { data } = $props();
</script>

<Meta title={data.seo.title} description={data.seo.description} image={data.seo.image} />

<MenuBar />
<svelte:boundary>
	<StaticPage {slug} {...data} />
	{#snippet pending()}
		<div class="border-t">
			<p>{m.loading()}</p>
		</div>
	{/snippet}
</svelte:boundary>
<Footer />
