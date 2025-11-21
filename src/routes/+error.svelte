<script lang="ts">
	import MenuBar from '$lib/components/MenuBar.svelte';
	import StaticPage from '$lib/components/StaticPage.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import Footer from '$lib/components/Footer.svelte';

	let title = $derived(`${page.status} | ${page.error.message}`);
</script>

<MenuBar />
<Hero />
<svelte:boundary>
	<StaticPage {title} />
	{#snippet pending()}
		<div class="border-t">
			<p>{m.loading()}</p>
		</div>
	{/snippet}
</svelte:boundary>
<Footer />
