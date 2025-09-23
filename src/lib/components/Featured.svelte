<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import NewsletterPanel from '$lib/components/NewsletterPanel.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	const featured = await query('featured');
	const newsletters = await query('newsletters');
</script>

<section class="grid w-svw gap-2 lg:grid-cols-[1fr_320px]">
	<div class="space-y-4 p-2">
		<div class="coluhens-1 gap-2 [column-fill:balance] sm:columns-2 lg:columns-4">
			<div class="mb-4 break-inside-avoid">
				<a
					href={localizeHref('/archive/')}
					class="block h-full bg-brand-green-200 p-4 hover:bg-brand-black"
				>
					<h2 class="text-4xl leading-none font-medium">
						<span class="inline bg-white px-1">{m.explore_archive()}</span>
					</h2>
				</a>
			</div>

			{#each featured as item, i}
				<div class="mb-4 break-inside-avoid">
					<Card {item} {i} />
				</div>
			{/each}
		</div>
	</div>

	<aside class="lg:sticky lg:top-4">
		<NewsletterPanel items={newsletters.items} />
	</aside>
</section>
