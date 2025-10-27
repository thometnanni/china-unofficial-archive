<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	// import { derived } from 'svelte/store';
	import TextOutlined from '../TextOutlined.svelte';
	let { item, href } = $props();
	let isPortrait = $state(true);

	// let isOdd = $derived(Boolean(+item.id % 2));

	function onRatio(e) {
		isPortrait = e.detail.isPortrait;
	}
	const dataType = $derived(
		String(item?.objectType?.[0]?.title || '')
			.toLowerCase()
			.trim()
	);

	// console.log(dataType);
</script>

<a
	{href}
	class="card col-span-3 row-span-3 grid grid-cols-3 grid-rows-3 gap-8"
	data-type={dataType}
>
	<div
		class={`${isPortrait ? 'col-[1/3] row-[1/4]' : 'col-[1/4] row-[1/3]'} border border-card-primary`}
	>
		<div class="relative h-full p-1">
			<ImageFilter
				src={item.thumbnail}
				alt={item.title}
				on:ratio={onRatio}
				fit="cover"
				objectPosition="center center"
			/>
			{#if item.objectType}
				<div class="absolute top-1 left-[calc(var(--spacing)_*_-4)] text-balance">
					{#each item.objectType as objectType}
						<TextOutlined class="mb-1 text-card-primary">{objectType.title}</TextOutlined>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	{#if item.title}
		<TextOutlined
			as="h3"
			class={isPortrait
				? 'z-0 col-[2/4] row-[1/4] mb-2 ml-4 items-end'
				: 'z-0 col-[1/4] row-[3/4] mt-[calc(var(--spacing)_*_-10)] ml-4'}
		>
			{item.title}
		</TextOutlined>
	{/if}
</a>

<style>
	.card {
		--color-card-primary: var(--color-type-object);
	}
	.card[data-type='book'] {
		--color-card-primary: var(--color-type-object-book);
	}
	.card[data-type='article'] {
		--color-card-primary: var(--color-type-object-article);
	}
	.card[data-type='periodical'] {
		--color-card-primary: var(--color-type-object-periodical);
	}
	.card[data-type='newsletter'] {
		--color-card-primary: var(--color-type-object-newsletter);
	}
	.card[data-type='video'] {
		--color-card-primary: var(--color-type-object-video);
	}
	.card[data-type='film'] {
		--color-card-primary: var(--color-type-object-video);
	}
	.card[data-type='film and video'] {
		--color-card-primary: var(--color-type-object-video);
	}
</style>
