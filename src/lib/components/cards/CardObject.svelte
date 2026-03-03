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

<a
	{href}
	class:col-span-3={!isPortrait}
	class:col-span-2={isPortrait}
	class:row-span-2={!isPortrait}
	class:row-span-3={isPortrait}
	class="card grid grid-cols-1 grid-rows-1"
	class:hovering
	data-object-type={objectType}
	use:hoverable
	onhover-start={() => (hovering = true)}
	onhover-end={() => (hovering = false)}
>
	<div class="col-[1/2] row-[1/2] border border-card-primary bg-white p-1">
		<ImageFilter
			src={item.thumbnail}
			alt={item.title}
			inheritHoverState
			on:ratio={onRatio}
			fit="cover"
			objectPosition="center center"
			disabled={hovering}
		/>
	</div>

	{#if item.objectType}
		<div class="z-1 col-[1/2] row-[1/2] flex flex-col content-start justify-items-start gap-2">
			{#each item.objectType as objectType}
				<TextOutlined class="-translate-x-2 translate-y-3">{objectType.title}</TextOutlined>
			{/each}
		</div>
	{/if}

	<!-- {#if item.creator}
		<div class="z-1 col-[1/2] row-[1/2] flex flex-col content-start justify-items-start gap-2">
			{#each item.creator as creator}
				<TextOutlined class="-translate-x-2 translate-y-3">{creator.title}</TextOutlined>
			{/each}
		</div>
	{/if} -->

	{#if item.title}
		<div class="z-1 col-[1/2] row-[1/2] content-end justify-items-start">
			<TextOutlined as="h3" class="translate-x-2 translate-y-2">{item.title}</TextOutlined>
		</div>
	{/if}
</a>

<Snippet snippets={item.snippets} {href} {searchTerm} {objectType} />

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
	.card[data-object-type='4184'],
	.card[data-object-type='4561'] {
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
