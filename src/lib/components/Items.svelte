<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages.js';
	import Card from './Card.svelte';

	const items = $state(await query('items'));
</script>

<div class="space-y-4 p-2">
	<div class="columns-1 gap-2 [column-fill:balance] sm:columns-2 lg:columns-4">
		{#each items as item, i}
			<div class="mb-4 break-inside-avoid">
				<Card {item} {i} />
			</div>
		{/each}
	</div>
</div>

<style>
</style>
