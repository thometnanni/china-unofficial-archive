<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages.js';
	import Card from './Card.svelte';

	const { items } = $props();
</script>

<div class="items space-y-4 p-8">
	<div
		class="grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(auto-fit,minmax(var(--grid-cell-size),1fr))] gap-8"
	>
		{#each items as item, i}
			<Card {item} {i} />
		{/each}
	</div>
</div>

<style>
	.items {
		--grid-cell-size: 60px;
	}
</style>
