<script>
	import { onMount } from 'svelte';
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import NewsletterPanel from '$lib/components/NewsletterPanel.svelte';
	import FeaturedNews from '$lib/components/FeaturedNews.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	let featuredList = [];
	let newsletterList = [];

	onMount(async () => {
		const featured = await query('featured');
		const newsletters = await query('newsletters');
		featuredList = Array.isArray(featured) ? featured : (featured?.items ?? []);
		newsletterList = Array.isArray(newsletters) ? newsletters : (newsletters?.items ?? []);
	});
</script>

<section class="items grid min-h-200 w-svw gap-2 lg:grid-cols-[1fr_320px]">
	{#if featuredList.length > 0}
		<div class="p-5">
			<div
				class="grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(auto-fit,minmax(var(--grid-cell-size),1fr))] gap-8"
			>
				{#each featuredList as item, i}
					{#if i == 1}
						<FeaturedNews />
					{/if}

					<Card {item} {i} />
				{/each}

				<a href={localizeHref('/archive/')} class="col-span-4 row-span-1">
					<h2 class="custom-outline p-2 text-3xl leading-tight font-medium">
						<TextOutlined class="mb-1 ">
							{m.explore_archive()}
						</TextOutlined>
					</h2>
				</a>
			</div>
		</div>
	{/if}

	{#if newsletterList.length > 0}
		<aside class="lg:sticky lg:top-4">
			<NewsletterPanel items={newsletterList} />
		</aside>
	{/if}
</section>

<style>
	.custom-outline {
		cursor: pointer;
		--color-outlined-border: var(--color-black);
		--color-outlined-bg: var(--color-white);

		&:hover {
			--color-outlined-bg: var(--color-black);
			--color-outlined-text: var(--color-white);
		}
	}

	.items {
		--grid-cell-size: 65px;
	}
</style>
