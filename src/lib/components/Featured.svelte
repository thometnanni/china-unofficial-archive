<script>
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import CardCta from '$lib/components/cards/CardCta.svelte';
	import NewsletterPanel from '$lib/components/NewsletterPanel.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';

	let featuredItems = $derived($page.data.featured?.slice(0, 9));
	let newItems = $derived($page.data.newItems?.slice(0, 11));
	let newsletterItems = $derived($page.data.newsletters?.slice(0, 20));
</script>

<section class="m-auto max-w-[1640px] px-4 pt-6 pb-10">
	<div class="featureWrapper gap-0">
		<div class="featureMain space-y-6 pb-20">
			<div class="flex w-full max-w-full items-baseline justify-between gap-4">
				<h2 class="text-xl">{m.featured()}</h2>
			</div>

			<div class="featureList border-b pb-10 sm:border-b-0">
				{#each featuredItems as item, i}
					<div class="card">
						<Card {item} {i} />
					</div>
				{/each}
			</div>
		</div>

		<div class="newsletterCol space-y-4 border-brand pb-10 pl-2 md:border-l">
			<h2 class="text-xl">{m.nav_newsletter()}</h2>
			{#if newsletterItems?.length}
				<NewsletterPanel items={newsletterItems} />
			{/if}
			<CardCta
				href="https://chinaunofficialarchives.substack.com/"
				title="Subscribe to China Unofficial Archive"
				image="/demo.jpg"
			/>
		</div>
	</div>

	<div class="space-y-6 border-t border-brand pt-2">
		<div class="flex items-center justify-between gap-4">
			<h2 class="text-xl">{m.new()}</h2>
		</div>

		<div class="newList">
			{#each newItems as item, i}
				<div class="card">
					<Card {item} {i} />
				</div>
			{/each}
			<div class="card">
				<CardCta href={localizeHref('/archive/')} title={m.explore_archive()} image="/hero.jpg" />
			</div>
		</div>
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

	.card {
		@apply flex-none;
		width: min(var(--cardSize), var(--cardMax));
		height: min(var(--cardSize), var(--cardMax));
	}

	.card :global(> *) {
		@apply h-full w-full;
		/* testing the fontsize depending on the card size */
		/* font-size: clamp(0.75rem, calc(var(--cardSize) / 26), 1rem); */
	}

	.featureWrapper {
		@apply flex flex-col items-center;
		gap: var(--gap);
	}

	.featureMain {
		@apply flex w-full flex-col items-center;
	}

	.featureList {
		@apply flex max-w-full flex-nowrap justify-start overflow-x-auto px-4 pt-4;
		gap: var(--gap);
		scrollbar-width: thin;
	}


	.newsletterCol {
		@apply w-full;
	}

	.newList {
		@apply flex flex-nowrap justify-start overflow-x-auto px-4 pt-4;
		gap: var(--gap);
		scrollbar-width: thin;
	}


	@media (min-width: 768px) {
		:global(:root) {
			--cardSize: calc((var(--effectiveWidth) - 2 * var(--sidePadding) - 2 * var(--gap)) / 3);
		}

		.featureWrapper {
			@apply flex-row items-start justify-center;
		}

		.featureMain {
			flex: 0 0 calc(2 * min(var(--cardSize), var(--cardMax)) + var(--gap));
			@apply items-start;
		}

		.newsletterCol {
			flex: 0 0 min(var(--cardSize), var(--cardMax));
			max-width: min(var(--cardSize), var(--cardMax));
		}

		.featureList {
			@apply flex-wrap overflow-x-visible px-0 pt-6;
		}

		.newList {
			@apply flex-wrap justify-center overflow-x-visible px-0 pt-6;
		}
	}

	@media (min-width: 1024px) {
		:global(:root) {
			--cardSize: calc((var(--effectiveWidth) - 2 * var(--sidePadding) - 3 * var(--gap)) / 4);
		}

		.featureMain {
			flex: 0 0 calc(3 * min(var(--cardSize), var(--cardMax)) + 2 * var(--gap));
		}

		.newsletterCol {
			flex: 0 0 min(var(--cardSize), var(--cardMax));
		}
	}
</style>
