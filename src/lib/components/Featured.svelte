<script>
	import { onMount } from 'svelte';
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import NewsletterPanel from '$lib/components/NewsletterPanel.svelte';
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
		<div class="p-8">
			<div
				class="grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(auto-fit,minmax(var(--grid-cell-size),1fr))] gap-8"
			>
				<a
					href={localizeHref('/archive/')}
					class="col-span-4 row-span-3 bg-brand-green-200 hover:bg-brand-black"
				>
					<h2 class="text-5xl leading-none font-medium">
						<span class="inline bg-white px-1">{m.explore_archive()}</span>
					</h2>
				</a>

				{#each featuredList as item, i}
					<Card {item} {i} />
				{/each}
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
	.items {
		--grid-cell-size: 60px;
	}
</style>
