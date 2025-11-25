<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { page } from '$app/stores';
	import Snippet from '$lib/components/cards/Snippet.svelte';
	import { hoverable } from '$lib/actions/hoverable';

	let { item, href } = $props();
	let isPortrait = $state(true);
	function onRatio(e) {
		isPortrait = e.detail.isPortrait;
	}
	const objectType = $derived(item?.objectType?.[0]?.id || '');
	const searchTerm = $derived(String($page.url.searchParams.get('search') || '').trim());
	const titleClass = $derived(
		isPortrait ? 'z-0 col-[2/4] row-[1/4] mb-2 ml-4 items-end' : 'z-0 col-[1/4] row-[3/4] ml-4'
	);

	let hovering = $state(false);
</script>

<div class={`col-span-3 row-span-3 grid grid-rows-[auto_1fr] `}>
	<Snippet snippets={item.snippets} {href} {searchTerm} {objectType} />

	<a
		{href}
		class="card group col-span-3 row-span-3 grid grid-cols-3 grid-rows-3 gap-8"
		class:hovering
		data-object-type={objectType}
		use:hoverable
		onhover-start={() => (hovering = true)}
		onhover-end={() => (hovering = false)}
	>
		<div
			class={`${isPortrait ? 'col-[1/3] row-[1/4]' : 'col-[1/4] row-[1/3]'} border border-card-primary bg-white`}
		>
			<div class="relative h-full p-1">
				<ImageFilter
					src={item.thumbnail}
					alt={item.title}
					inheritHoverState
					on:ratio={onRatio}
					fit="cover"
					objectPosition="center center"
					disabled={hovering}
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
	.card[data-object-type='4186'] {
		--color-card-primary: var(--color-type-object-book);
	}
	.card[data-object-type='4187'] {
		--color-card-primary: var(--color-type-object-article);
	}
	.card[data-object-type='4184'] {
		--color-card-primary: var(--color-type-object-periodical);
	}
	.card[data-object-type='4185'] {
		--color-card-primary: var(--color-type-object-newsletter);
	}
	.card[data-object-type='4190'] {
		--color-card-primary: var(--color-type-object-video);
	}
	.card.hovering {
		--color-outlined-border: var(--color-white);
		--color-outlined-bg: var(--color-card-primary);
		--color-outlined-text: var(--color-white);
	}
</style>
