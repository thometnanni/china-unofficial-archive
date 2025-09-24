<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages.js';
	import Card from './Card.svelte';

	const items = $state(await query('items'));
</script>

<div class="space-y-4 p-2">
	<div class="grid auto-rows-[10rem]  grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-8">
		{#each items as item, i}
			<Card {item} {i} />
		{/each}
	</div>
</div>

<style>
</style>
