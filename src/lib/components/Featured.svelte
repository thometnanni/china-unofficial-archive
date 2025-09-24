<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import NewsletterPanel from '$lib/components/NewsletterPanel.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	const featured = await query('featured');
	const newsletters = await query('newsletters');

	const featuredList = Array.isArray(featured) ? featured : (featured?.items ?? []);
	const newsletterList = Array.isArray(newsletters) ? newsletters : (newsletters?.items ?? []);
</script>

<section class="grid w-svw gap-2 lg:grid-cols-[1fr_320px]">
	<div class="p-2">
		<div class="grid auto-rows-[10rem] grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-8">
			<a
				href={localizeHref('/archive/')}
				class="col-span-2 row-span-1 bg-brand-green-200 hover:bg-brand-black"
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

	<aside class="lg:sticky lg:top-4">
		<NewsletterPanel items={newsletterList} />
	</aside>
</section>
