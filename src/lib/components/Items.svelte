<script>
	import Card from './Card.svelte';
	const { items } = $props();
</script>

<section class="w-full px-4 pt-8 pb-10">
	<div class="itemsList flex flex-wrap justify-center">
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
		--gap: 1.5rem;
		--sidePadding: 2rem;
		--innerMax: 1640px;
		--effectiveWidth: min(100vw, var(--innerMax));
		--cardMax: 420px;
		--cardSize: calc(var(--effectiveWidth) - 2 * var(--sidePadding));
	}

	.itemsList {
		@apply flex flex-wrap justify-center;
		gap: var(--gap);
	}

	.card {
		width: var(--cardSize);
		height: var(--cardSize);
		/* testing the fontsize depending on the card size */
		/* font-size: clamp(0.75rem, calc(var(--cardSize) / 26), 1rem); */
	}

	@media (min-width: 768px) {
		:global(:root) {
			--cardSize: min(
				calc((var(--effectiveWidth) - 2 * var(--sidePadding) - 1 * var(--gap)) / 2),
				var(--cardMax)
			);
		}
	}

	@media (min-width: 1024px) {
		:global(:root) {
			--cardSize: min(
				calc((var(--effectiveWidth) - 2 * var(--sidePadding) - 2 * var(--gap)) / 3),
				var(--cardMax)
			);
		}
	}

	@media (min-width: 1280px) {
		:global(:root) {
			--cardSize: min(
				calc((var(--effectiveWidth) - 2 * var(--sidePadding) - 3 * var(--gap)) / 4),
				var(--cardMax)
			);
		}
	}
</style>
