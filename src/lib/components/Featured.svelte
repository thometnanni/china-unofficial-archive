<script>
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import CardCta from '$lib/components/cards/CardCta.svelte';
	import NewsletterPanel from '$lib/components/NewsletterPanel.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { setupResize } from '$lib/resize';
	import { browser } from '$app/environment';

	let featuredItems = $derived($page.data.featured?.slice(0, 9));
	let newItems = $derived($page.data.newItems?.slice(0, 11));
	let newsletterItems = $derived($page.data.newsletters?.slice(0, 20));

	let featureListRef;
	let newsletterColRef;
	let resizeCleanup;

	function syncHeight() {
		if (!browser) return;
		if (!featureListRef || !newsletterColRef) return;

		const width = window.innerWidth || document.documentElement.clientWidth || 0;

		if (!width || width < 768) {
			newsletterColRef.style.height = '';
			return;
		}

		const listHeight = featureListRef.offsetHeight;
		newsletterColRef.style.height = listHeight + 'px';
	}

	onMount(() => {
		if (!browser) return;
		setupResize(featureListRef, syncHeight);
	});
</script>

<section class="m-auto max-w-[1640px] px-0 pt-6 pb-10 md:px-4">
	<div class="featureWrapper gap-0">
		<div class="featureMain">
			<div class="flex w-full max-w-full items-baseline justify-between gap-4 px-4 md:px-0">
				<h2 class="text-3xl">{m.featured()}</h2>
			</div>
			<p class="swipeHint px-4 md:px-0">{m.swipe_more_items()}</p>

			<div class="featureList pb-10" bind:this={featureListRef}>
				{#each featuredItems as item, i}
					<Card {item} {i} />
				{/each}
			</div>
		</div>

		<div class="newsletterCol pb-10" bind:this={newsletterColRef}>
			<h2 class="w-full border-t border-brand pt-2 text-3xl md:border-t-0 md:pt-0">
				{m.nav_newsletter()}
			</h2>

			{#if newsletterItems?.length}
				<div class="newsletterPanelWrapper">
					<NewsletterPanel items={newsletterItems} />
				</div>
			{/if}

			<CardCta
				target="_blank"
				href="https://chinaunofficialarchives.substack.com/"
				title={m.subscribe()}
				image="/demo.webp"
			/>
		</div>
	</div>

	<div class="space-y-6 pt-2">
		<div class="m-0 flex w-full max-w-full items-baseline justify-between px-4 md:px-0">
			<h2 class="w-full border-t border-brand pt-2 text-3xl md:border-t-0 md:pt-0">
				{m.new()}
			</h2>
		</div>
		<p class="swipeHint px-4 md:px-0">{m.swipe_more_items()}</p>

		<div class="newList">
			{#each newItems as item, i}
				<Card {item} {i} />
			{/each}
			<CardCta
				stretch="true"
				href={localizeHref('/archive/')}
				title={m.explore_archive()}
				image="/hero.webp"
			/>
		</div>
	</div>
</section>

<style>
	@reference '../../app.css';

	.featureWrapper {
		@apply flex flex-col items-center;
		gap: var(--gap);
	}

	.featureMain {
		@apply flex w-full flex-col items-stretch;
		position: relative;
	}

	.featureList {
		@apply ml-2 flex w-full flex-nowrap justify-start gap-8 overflow-x-auto overflow-y-hidden px-4 pt-4;
		scrollbar-width: thin;
	}

	.newsletterCol {
		@apply flex w-full flex-col px-4 pt-2;
		overflow: hidden;
	}

	.swipeHint {
		@apply w-full self-start text-sm;
	}

	.newsletterPanelWrapper {
		@apply min-h-0 flex-1 overflow-hidden;
	}

	.newList {
		@apply ml-2 flex w-full flex-nowrap items-center justify-start gap-8 overflow-x-auto overflow-y-hidden px-4 pt-4;
		scrollbar-width: thin;
	}

	@media (min-width: 768px) {
		.featureWrapper {
			@apply flex-row items-stretch justify-center;
		}

		.featureMain {
			flex: 0 0 calc(2 * min(var(--cardSize), var(--cardMax)) + var(--gap));
			@apply items-start;
		}

		.featureMain::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			right: calc((var(--gap) / -2) - 1px);
			width: 1px;
			background: var(--color-brand);
			pointer-events: none;
		}

		.newsletterCol {
			@apply px-0 pt-0;
			flex: 0 0 min(var(--cardSize), var(--cardMax));
			max-width: min(var(--cardSize), var(--cardMax));
		}

		.featureList {
			@apply mr-0 w-auto flex-wrap gap-8 overflow-x-visible px-0 pt-6;
		}

		.swipeHint {
			display: none;
		}

		.newList {
			@apply mr-0 w-auto flex-wrap justify-center gap-8 overflow-x-visible px-0 pt-6;
		}
	}

	@media (min-width: 1224px) {
		.featureMain {
			flex: 0 0 calc(3 * min(var(--cardSize), var(--cardMax)) + 2 * var(--gap));
		}

		.newsletterCol {
			flex: 0 0 min(var(--cardSize), var(--cardMax));
		}
	}
</style>
