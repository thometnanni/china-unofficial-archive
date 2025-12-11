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

<section>
	<div class={`col-span-3 row-span-3 grid grid-rows-[auto_1fr] bg-white`}>
		<a
			{href}
			class="card group col-span-3 row-span-3 border border-card-primary"
			class:hovering
			use:hoverable
			onhover-start={() => (hovering = true)}
			onhover-end={() => (hovering = false)}
		>
			<div class="relative h-full p-1">
				<ImageFilter
					src={item.thumbnail}
					color="var(--color-card-primary)"
					inheritHoverState
					fit="cover"
					objectPosition="center 35%"
					disabled={hovering}
				/>
				<TextOutlined
					as="h3"
					class="absolute right-[calc(var(--spacing)_*_-4)] bottom-4 text-right text-xl"
					>{item.title}</TextOutlined
				>
			</div>
		</a>
	</div>
	<Snippet snippets={item.snippets} {href} {searchTerm} dataType="creator" />
</section>

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
