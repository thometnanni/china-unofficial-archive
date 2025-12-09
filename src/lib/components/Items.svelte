<script>
	import Card from './Card.svelte';
	const { items } = $props();
</script>

<section class="itemsSection w-full px-8 pt-8 pb-10">
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

	.itemsSection {
		--gap: 2rem;
		--cardMax: 420px;
		--cardSize: min(100%, var(--cardMax));
	}

	.itemsList {
		@apply flex flex-wrap justify-center;
		gap: var(--gap);
	}

	.card {
		width: var(--cardSize);
		height: var(--cardSize);
		/* testing the fontsize depending on the card size */
		/* font-size: clamp(0.75rem, calc(var(--cardSize) / 20), 1rem); */
	}

	@media (min-width: 768px) {
		.itemsSection {
			--cardSize: min(calc((100% - 1 * var(--gap)) / 2), var(--cardMax));
		}
	}

	@media (min-width: 1024px) {
		.itemsSection {
			--cardSize: min(calc((100% - 2 * var(--gap)) / 3), var(--cardMax));
		}
	}

	@media (min-width: 1280px) {
		.itemsSection {
			--cardSize: min(calc((100% - 3 * var(--gap)) / 4), var(--cardMax));
		}
	}
</style>
