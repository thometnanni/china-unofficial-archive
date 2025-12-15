<script>
	import Card from './Card.svelte';
	const { items } = $props();
</script>

<section class="itemsSection m-auto max-w-[1640px] pt-8 pb-10">
	<div class="itemsList">
		{#each items as item, i}
			<Card {item} {i} />
		{/each}
	</div>
</section>

<style>
	@reference '../../app.css';

	.itemsList {
		@apply flex flex-wrap justify-center overflow-x-auto pt-4;
		gap: var(--gap);
		scrollbar-width: thin;
	}

	@media (min-width: 768px) {
		.itemsList {
			@apply flex-wrap justify-center overflow-x-visible px-0 pt-6;
		}
	}
</style>
