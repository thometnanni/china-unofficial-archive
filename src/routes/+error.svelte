<script lang="ts">
	import MenuBar from '$lib/components/MenuBar.svelte';
	import StaticPage from '$lib/components/StaticPage.svelte';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';

	let title = $derived(`${page.status} | ${page.error.message}`);
</script>

<MenuBar />

<svelte:boundary>
	<StaticPage {title} />
	{#snippet pending()}
		<div class="border-t">
			<p>{m.loading()}</p>
		</div>
	{/snippet}
</svelte:boundary>
