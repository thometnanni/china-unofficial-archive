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
	let recentItems = [];

	onMount(async () => {
		const featured = await query('featured');
		const newsletters = await query('newsletters');
		const recent = await query('items');

		featuredList = (Array.isArray(featured) ? featured : (featured?.items ?? [])).sort(
			() => Math.random() - 0.5
		);

		recentItems = (Array.isArray(recent) ? recent : (recent?.items ?? []))
			.filter((d) => d?.objectType?.length)
			.slice(0, 10);

		console.log(recentItems);
		newsletterList = Array.isArray(newsletters) ? newsletters : (newsletters?.items ?? []);
	});
</script>

<section class="items grid min-h-200 w-svw items-start gap-2 lg:grid-cols-[1fr_320px]">
	{#if featuredList.length > 0}
		<div class="p-5">
			<div
				class="grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(auto-fit,minmax(var(--grid-cell-size),1fr))] gap-8"
			>
				<!-- <FeaturedNews /> -->
				{#each [...recentItems] as item, i}
					{#if i == 1}
						<h2
							class="custom-outline pointer-events-none col-span-4 row-span-1 text-2xl leading-[var(--lh-tight)] font-medium"
						>
							<TextOutlined class="mb-1 ">{m.new()}</TextOutlined>
						</h2>
					{/if}
					<Card {item} {i} />
				{/each}

				{#each [...featuredList] as item, i}
					{#if i == 1}
						<h2
							class="custom-outline pointer-events-none col-span-4 row-span-1 text-2xl leading-[var(--lh-tight)] font-medium"
						>
							<TextOutlined class="mb-1 ">{m.featured()}</TextOutlined>
						</h2>
					{/if}

					<Card {item} {i} />
				{/each}

				<a href={localizeHref('/archive/')} class="col-span-4 row-span-1">
					<h2 class="custom-outline p-2 text-2xl leading-tight font-medium">
						<TextOutlined class="mb-1 ">
							{m.explore_archive()}
						</TextOutlined>
					</h2>
				</a>
			</div>
		</div>
	{/if}

	{#if newsletterList.length > 0}
		<aside class="sticky top-0">
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
		--grid-cell-size: 60px;
	}
</style>
