<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { page } from '$app/stores';
	import Snippet from '$lib/components/cards/Snippet.svelte';
	let { item, href } = $props();
	let isPortrait = $state(true);
	function onRatio(e) {
		isPortrait = e.detail.isPortrait;
	}
	const hasSnippets = $derived(Boolean(item?.snippets?.length));
	const dataType = $derived(
		String(item?.objectType?.[0]?.id || '')
			.toLowerCase()
			.trim()
	);
	const searchTerm = $derived(String($page.url.searchParams.get('search') || '').trim());
	const titleClass = $derived(
		isPortrait ? 'z-0 col-[2/4] row-[1/4] mb-2 ml-4 items-end' : 'z-0 col-[1/4] row-[3/4] ml-4'
	);
	console.log("here", item)
</script>

<div class={`col-span-3 row-span-3 grid grid-rows-[auto_1fr] `}>
	<Snippet snippets={item.snippets} {href} {searchTerm} {dataType} />

	<a
		{href}
		class="card group col-span-3 row-span-3 grid grid-cols-3 grid-rows-3 gap-8"
		data-type={dataType}
	>
		<div
			class={`${isPortrait ? 'col-[1/3] row-[1/4]' : 'col-[1/4] row-[1/3]'} border border-card-primary`}
		>
			<div class="relative h-full p-1">
				<ImageFilter
					src={item.thumbnail}
					alt={item.title}
					inheritHoverState
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
				>{item.title}</TextOutlined
			>
		{/if}
	</a>
</div>

<style>
	.card {
		--color-card-primary: var(--color-type-object);
	}
	.card[data-type='4186'] {
		--color-card-primary: var(--color-type-object-book);
	}
	.card[data-type='4187'] {
		--color-card-primary: var(--color-type-object-article);
	}
	.card[data-type='4184'] {
		--color-card-primary: var(--color-type-object-periodical);
	}
	.card[data-type='4185'] {
		--color-card-primary: var(--color-type-object-newsletter);
	}
	.card[data-type='4190'] {
		--color-card-primary: var(--color-type-object-video);
	}
	.card:hover {
		--color-outlined-border: var(--color-card-primary);
		--color-outlined-bg: var(--color-card-primary);
		--color-outlined-text: var(--color-black);
	}
</style>
