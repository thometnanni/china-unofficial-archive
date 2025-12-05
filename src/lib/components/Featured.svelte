<script>
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import CardCta from '$lib/components/cards/CardCta.svelte';
	import NewsletterPanel from '$lib/components/NewsletterPanel.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';

	let featuredItems = $derived($page.data.featured?.slice(0, 9));
	let newItems = $derived($page.data.newItems?.slice(0, 6));
	let newsletterItems = $derived($page.data.newsletters?.slice(0, 20));
</script>

<section class="m-auto max-w-[1640px] space-y-14 px-4 pt-6 pb-10">
	<div class="pb-2">
		<div class="grid grid-cols-1 gap-2 lg:grid-cols-12">
			<div class="space-y-6 lg:col-span-9">
				<div class="flex items-baseline justify-between gap-4">
					<h2 class="text-2xl">{m.featured()}</h2>
				</div>

				<div class="feature-list">
					{#each featuredItems as item, i}
						<div class="feature-card">
							<Card {item} {i} />
						</div>
					{/each}
				</div>
			</div>

			<div class="space-y-4 border-brand pl-2 sm:border-l lg:col-span-3">
				<h2 class="text-2xl">{m.nav_newsletter()}</h2>
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
	</div>

	<div class="space-y-6 border-t border-brand">
		<div class="flex items-center justify-between gap-4">
			<h2 class="text-2xl">{m.new()}</h2>
		</div>

		<div class="new-list">
			{#each newItems as item, i}
				<div class="new-card">
					<Card {item} {i} />
				</div>
			{/each}

			<div class="cta-card">
				<CardCta href={localizeHref('/archive/')} title={m.explore_archive()} image="/hero.jpg" />
			</div>
		</div>
	</div>
</section>

<style>
	@reference '../../app.css';

	.feature-list {
		@apply flex w-full gap-6 overflow-x-auto p-4;
		scrollbar-width: thin;
		grid-auto-columns: clamp(240px, 82vw, 320px);
	}

	.feature-card {
		@apply flex flex-none;
		width: clamp(240px, 82vw, 320px);
		aspect-ratio: 1 / 1;
	}

	.new-list {
		@apply flex w-full gap-6 overflow-x-auto p-4;
		scrollbar-width: thin;
		grid-auto-columns: clamp(240px, 82vw, 320px);
	}

	.new-card {
		@apply flex flex-none;
		width: clamp(240px, 82vw, 320px);
		aspect-ratio: 1 / 1;
	}

	.feature-card :global(> *),
	.new-card :global(> *) {
		@apply h-full w-full;
	}

	.cta-card {
		@apply flex flex-none;
		width: clamp(240px, 82vw, 320px);
		aspect-ratio: 3 / 1;
	}

	.cta-card :global(> *) {
		@apply h-full w-full;
	}

	@media (min-width: 1024px) {
		.feature-list {
			@apply grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(6,minmax(var(--grid-cell-size),1fr))];
			grid-auto-columns: unset;
		}

		.feature-card {
			@apply contents;
		}

		.new-list {
			@apply grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(9,minmax(var(--grid-cell-size),1fr))];
			grid-auto-columns: unset;
		}

		.new-card {
			@apply contents;
		}

		.cta-card {
			@apply contents;
		}
	}

	@media (min-width: 1280px) {
		.feature-list {
			@apply grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(9,minmax(var(--grid-cell-size),1fr))];
			grid-auto-columns: unset;
		}

		.feature-card {
			@apply contents;
		}

		.new-list {
			@apply grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(12,minmax(var(--grid-cell-size),1fr))];
			grid-auto-columns: unset;
		}

		.new-card {
			@apply contents;
		}

		.cta-card {
			@apply contents;
		}
	}
</style>
