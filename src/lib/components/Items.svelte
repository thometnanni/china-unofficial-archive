<script>
	import Card from './Card.svelte';
	const { items } = $props();
</script>

<section class="itemsSection m-auto max-w-[1640px] px-4 pt-8 pb-10">
	<div class="itemsList">
		{#each items as item, i}
			<div class="card">
				<Card {item} {i} />
			</div>
		{/each}
	</div>
</section>

<style>
	@reference '../../app.css';

	:global(:root) {
		--gap: 2rem;
		--sidePadding: 1rem;
		--innerMax: 1640px;
		--effectiveWidth: min(100vw, var(--innerMax));
		--cardMax: 420px;
		--cardSize: calc(var(--effectiveWidth) - 2 * var(--sidePadding)) ;
	}

	.itemsList {
		@apply flex flex-wrap justify-start overflow-x-auto px-4 pt-4;
		gap: var(--gap);
		scrollbar-width: thin;
	}

	.card {
		/* @apply flex-none; */
		width: min(var(--cardSize), var(--cardMax));
		height: min(var(--cardSize), var(--cardMax));
	}

	.card :global(> *) {
		@apply h-full w-full;
	}

	@media (min-width: 768px) {
		:global(:root) {
			--cardSize: calc(
				(var(--effectiveWidth) - 2 * var(--sidePadding) - 2 * var(--gap)) / 3 - 10px
			);
		}

		.itemsList {
			@apply flex-wrap justify-center overflow-x-visible px-0 pt-6;
		}
	}

	@media (min-width: 1224px) {
		:global(:root) {
			--cardSize: calc(
				(var(--effectiveWidth) - 2 * var(--sidePadding) - 3 * var(--gap)) / 4 - 10px
			);
		}
	}
</style>
