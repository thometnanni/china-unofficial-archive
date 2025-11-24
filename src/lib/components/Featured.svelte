<script>
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';

	let featuredItems = $derived($page.data.featured.slice(0, 5));
	let newItems = $derived($page.data.newItems.slice(0, 5));
	let newsletterItems = $derived($page.data.newsletters.slice(0, 5));
</script>

<section
	class="items m-auto grid max-w-[1640px] grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(auto-fit,minmax(var(--grid-cell-size),1fr))] gap-8 p-8"
>
	{#each featuredItems as item, i}
		{#if i == 0}
			<h2
				class="custom-outline pointer-events-none col-span-4 row-span-1 text-xl sm:text-3xl leading-[var(--lh-tight)] font-medium"
			>
				<TextOutlined class="mb-1 ">{m.featured()}</TextOutlined>
			</h2>
		{/if}

		<Card {item} {i} />
	{/each}

	{#each newItems as item, i}
		{#if i == 0}
			<h2
				class="custom-outline col-span-4 row-span-1 text-xl sm:text-3xl leading-[var(--lh-tight)] font-medium"
			>
				<a href={localizeHref('/archive/')} class="col-span-4 row-span-1">
					<TextOutlined class="mb-1 ">{m.new()}</TextOutlined>
				</a>
			</h2>
		{/if}
		<Card {item} {i} />
	{/each}

	{#each newsletterItems as item, i}
		{#if i == 0}
			<h2
				class="custom-outline col-span-4 row-span-1 text-xl sm:text-3xl leading-[var(--lh-tight)] font-medium"
			>
				<a href={localizeHref('/archive?objectType=4185/')} class="col-span-4 row-span-1">
					<TextOutlined class="mb-1 ">{m.nav_newsletter()}</TextOutlined>
				</a>
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
