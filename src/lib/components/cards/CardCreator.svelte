<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { page } from '$app/stores';
	import Snippet from '$lib/components/cards/Snippet.svelte';
	let { item, href } = $props();
	const hasSnippets = $derived(Boolean(item?.snippets?.length));
	const searchTerm = $derived(String($page.url.searchParams.get('search') || '').trim());
</script>

<div class={`col-span-3 row-span-3 grid grid-rows-[auto_1fr]`}>
	<Snippet snippets={item.snippets} {href} {searchTerm} dataType="creator" />

	<a {href} class="card group col-span-3 row-span-3 border border-card-primary">
		<div class="relative h-full p-1">
				<ImageFilter
					src={item.thumbnail}
					color="var(--color-card-primary)"
					inheritHoverState
					fit="cover"
					objectPosition="center 35%"
				/>
			<TextOutlined
				as="h3"
				class="absolute right-[calc(var(--spacing)_*_-4)] bottom-4 text-right text-xl"
				>{item.title}</TextOutlined
			>
		</div>
	</a>
</div>

<style>
	.card {
		--color-card-primary: var(--color-type-creator);
	}
	.card:hover {
		--color-outlined-border: var(--color-card-primary);
		--color-outlined-bg: var(--color-card-primary);
		--color-outlined-text: var(--color-black);
	}
</style>
