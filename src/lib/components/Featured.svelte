<script>
	import { m } from '$lib/paraglide/messages';
	import Card from '$lib/components/Card.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';

	let featuredItems = $derived($page.data.featured);
	let newItems = $derived($page.data.newItems);
	let newsletterItems = $derived($page.data.newsletters);
</script>

<section
	class="items grid grid-flow-dense auto-rows-[var(--grid-cell-size)] grid-cols-[repeat(auto-fit,minmax(var(--grid-cell-size),1fr))] gap-8 p-8"
>
	{#each newItems as item, i}
		{#if i == 0}
			<h2
				class="custom-outline col-span-4 row-span-1 text-2xl leading-[var(--lh-tight)] font-medium"
			>
				<a href={localizeHref('/archive/')} class="col-span-4 row-span-1">
					<TextOutlined class="mb-1 ">{m.new()}</TextOutlined>
				</a>
			</h2>
		{/if}
		<Card {item} {i} />
	{/each}

	{#each featuredItems as item, i}
		{#if i == 0}
			<h2
				class="custom-outline pointer-events-none col-span-4 row-span-1 text-2xl leading-[var(--lh-tight)] font-medium"
			>
				<TextOutlined class="mb-1 ">{m.featured()}</TextOutlined>
			</h2>
		{/if}

		<Card {item} {i} />
	{/each}

	{#each newsletterItems as item, i}
		{#if i == 0}
			<h2
				class="custom-outline col-span-4 row-span-1 text-2xl leading-[var(--lh-tight)] font-medium"
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
