<script>
	import { query } from '$lib/api';

	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { creator } from 'd3-selection';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';

	const { item } = $props();
	$effect(() => {
		console.log(item);
	});

	const dataType = $derived(
		String(item?.objectType?.[0]?.id || '')
			.toLowerCase()
			.trim()
	);
</script>

<section class="flex flex-col gap-2 p-2" data-type={dataType}>
	{#if item.thumbnail && item.type == 'creator'}
		<div class="{item.type} card z-10 mt-[-40px] ml-10 max-h-[200px] w-fit border">
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

	<h2 class="z-10 mt-[-30px] text-3xl">
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

	<div class="flex flex-wrap gap-2">
		{#each item.creator as creator}
			{#if creator.title}
				<a class="person creatorTag" href={localizeHref(`/archive/${creator.id}`)}>
					<TextOutlined>
						{creator.title}
					</TextOutlined>
				</a>
			{/if}
		{/each}

		{#each item.objectType as objectType}
			{#if objectType.title}
				<a
					class="{item.type} tag box-decoration-clone text-black"
					href={localizeHref(`/archive/${objectType.id}`)}
				>
					<TextOutlined>
						{objectType.title}
					</TextOutlined>
				</a>
			{/if}
		{/each}

		{#each [...(item.theme ?? []), ...(item.era ?? [])] as theme}
			{#if theme.title}
				<a class="filter {item.type} tag leading-loose" href={localizeHref(`/archive/${theme.id}`)}>
					<TextOutlined>
						{theme.title}
					</TextOutlined>
				</a>
			{/if}
		{/each}
	</div>

	<div class="item-container text-xl whitespace-pre-wrap">
		{@html item.description}
	</div>
</section>

<style>
	.tag {
		--color-outlined-border: var(--color-type-object);
		/* border-color: var(--color-type-object); */
		/* background: var(--color-type-object); */
	}
	.tag:hover {
		--color-outlined-bg: var(--color-type-object);
		--color-outlined-text: var(--color-black);
	}

	.creatorTag {
		--color-outlined-border: var(--color-type-creator);
		/* border-color: var(--color-type-creator); */
		/* background: var(--color-type-creator); */
	}

	.creatorTag:hover {
		--color-outlined-bg: var(--color-type-creator);
		--color-outlined-text: var(--color-black);
	}

	section {
		--color-card-primary: var(--color-type-object);
	}
	section[data-type='4186'] {
		--color-card-primary: var(--color-type-object-book);
	}
	section[data-type='4187'] {
		--color-card-primary: var(--color-type-object-article);
	}
	section[data-type='4184'] {
		--color-card-primary: var(--color-type-object-periodical);
	}
	section[data-type='4185'] {
		--color-card-primary: var(--color-type-object-newsletter);
	}
	section[data-type='4190'] {
		--color-card-primary: var(--color-type-object-video);
	}

	:global(.item-container a) {
		text-decoration: underline;
	}
</style>
