<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { page } from '$app/stores';
	import Snippet from '$lib/components/cards/Snippet.svelte';
	import { hoverable } from '$lib/actions/hoverable';
	let { item, href } = $props();
	const searchTerm = $derived(String($page.url.searchParams.get('search') || '').trim());

	let hovering = $state(false);
</script>

<a
	{href}
	class="card col-span-3 row-span-3 grid grid-cols-1 grid-rows-1"
	class:hovering
	use:hoverable
	onhover-start={() => (hovering = true)}
	onhover-end={() => (hovering = false)}
>
	<div class="col-[1/2] row-[1/2] border border-card-primary bg-white p-1">
		<ImageFilter
			src={item.thumbnail}
			alt={item.title}
			color="var(--color-card-primary)"
			inheritHoverState
			fit="cover"
			objectPosition="center 35%"
			disabled={hovering}
		/>
	</div>

	{#if item.title}
		<div class="z-1 col-[1/2] row-[1/2] content-end justify-items-end">
			<TextOutlined as="h3" class="-translate-x-2 translate-y-2">{item.title}</TextOutlined>
		</div>
	{/if}
</a>

<Snippet snippets={item.snippets} {href} {searchTerm} dataType="creator" />

<style>
	.card {
		--color-card-primary: var(--color-type-creator);
	}
	.card.hovering {
		--color-outlined-border: var(--color-white);
		--color-outlined-bg: var(--color-card-primary);
		--color-outlined-text: var(--color-white);
	}
</style>
