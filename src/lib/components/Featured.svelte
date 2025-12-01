<script>
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import NewsletterPanel from '$lib/components/NewsletterPanel.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';

	let featuredItems = $derived($page.data.featured?.slice(0, 8));
	let newItems = $derived($page.data.newItems?.slice(0, 8));
	let newsletterItems = $derived($page.data.newsletters?.slice(0, 10));

	let newsletterList = $derived(
		newsletterItems?.map((item) => ({
			...item,
			url: localizeHref(`/archive/${item.id}`),
			date: item.published
		}))
	);
</script>

<section class="m-auto max-w-[1640px]">
	<div class="grid gap-8 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
		<div
			class="grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(auto-fit,minmax(var(--grid-cell-size),1fr))] gap-8"
		>
			<h2
				class="custom-outline pointer-events-none col-span-4 self-end text-xl leading-[var(--lh-tight)] font-medium sm:text-4xl"
			>
				<TextOutlined class="mb-1 ">{m.featured()}</TextOutlined>
			</h2>

			{#each featuredItems as item, i}
				<Card {item} {i} />
			{/each}
		</div>

		<div class="h-fit">
			{#if newsletterList?.length}
				<NewsletterPanel items={newsletterList} />
			{/if}
		</div>
	</div>

	<div class="space-y-4 p-5 pt-20">
		<h2 class="custom-outline text-xl leading-[var(--lh-tight)] font-medium sm:text-4xl">
			<a href={localizeHref('/archive/')}>
				<TextOutlined class="mb-1 ">{m.new()}</TextOutlined>
			</a>
		</h2>

		<div
			class="grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(auto-fit,minmax(var(--grid-cell-size),1fr))] gap-8"
		>
			{#each newItems as item, i}
				<Card {item} {i} />
			{/each}
		</div>
	</div>

	<a href={localizeHref('/archive/')} class="my-5 block">
		<h2 class="custom-outline inline-block p-2 text-4xl leading-tight font-medium">
			<TextOutlined class="mb-1 ">
				{m.explore_archive()}
			</TextOutlined>
		</h2>
	</a>
</section>

<style>
	.custom-outline {
		cursor: pointer;
		--color-outlined-border: var(--color-brand-purple);
		--color-outlined-bg: var(--color-white);

		&:hover {
			--color-outlined-bg: var(--color-brand-purple);
			--color-outlined-text: var(--color-white);
		}
	}
</style>
