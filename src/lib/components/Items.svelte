<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages.js';
	import Card from './Card.svelte';

	const { items } = $props();
</script>

<div class="items space-y-4 p-8">
	<div
		class="grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(auto-fit,var(--grid-cell-size))] justify-center gap-8"
	>
		{#each items as item, i}
			<Card {item} {i} />
		{/each}
	</div>
</div>
