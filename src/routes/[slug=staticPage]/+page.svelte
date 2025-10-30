<script>
	import MenuBar from '$lib/components/MenuBar.svelte';
	import StaticPage from '$lib/components/StaticPage.svelte';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import { m } from '$lib/paraglide/messages';

	let slug = $derived($page.params.slug);

	let { data } = $props();
</script>

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
