<script>
	import { query } from '$lib/api';

	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { creator } from 'd3-selection';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';

	const { item } = $props();
	console.log(item.description);
</script>

<section class="item-container flex flex-col gap-4 p-2">
	{#if item.thumbnail && item.type == 'creator'}
		<div class="{item.type} card max-h-[200px] w-fit border">
			<img
				src={item.thumbnail}
				alt=""
				crossorigin="anonymous"
				class="object-fit block max-h-[200px] border"
			/>

			<!-- <ImageFilter
				src={item.thumbnail}
				alt={item.title}
				color="var(--color-brand-primary)"
				fit="contain"
			/> -->
		</div>
	{/if}

	<h2 class="text-2xl">
		<TextOutlined>{item.title}</TextOutlined>
	</h2>
	{#if item.titleAlt?.length > 0}
		<h3 class="text-xl">
			<TextOutlined>{item.titleAlt}</TextOutlined>
		</h3>
	{/if}
	<!-- <p>
		{item.published}
	</p> -->
	<p>
		{#each item.creator as creator}
			<a class="person bg-gray-200 px-2 py-1" href={localizeHref(`/archive/${creator.id}`)}
				>{creator.title}</a
			>
		{/each}
	</p>
	<p>
		{#each item.objectType as objectType}
			<a
				class="{item.type} bg-gray-200 box-decoration-clone px-2 py-1 text-black"
				href={localizeHref(`/archive/${objectType.id}`)}>{objectType.title}</a
			>
		{/each}
	</p>
	<div>
		{#each [...(item.theme ?? []), ...(item.era ?? [])] as theme}
			<a
				class="filter {item.type} mr-1 bg-gray-200 p-1 text-xs leading-loose"
				href={localizeHref(`/archive/${theme.id}`)}
			>
				{theme.title}
			</a>
		{/each}
	</div>
	<div class="text-xl whitespace-pre-wrap">
		{@html item.description}
	</div>
</section>

<style>
	.card {
		--color-card-primary: var(--color-type-creator);
	}

	:global(.item-container a) {
		text-decoration: underline;
	}
</style>
