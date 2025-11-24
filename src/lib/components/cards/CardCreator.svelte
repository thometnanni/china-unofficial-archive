<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { page } from '$app/stores';
	import Snippet from '$lib/components/cards/Snippet.svelte';
	import { hoverable } from '$lib/actions/hoverable';
	import { get } from 'svelte/store';
	let { item, href } = $props();
	const searchTerm = $derived(String($page.url.searchParams.get('search') || '').trim());

	let background = $derived.by(() => {
		if (!item.objectTypes ?? Object.keys(item.objectTypes).length === 0) return null;

		const totalItems = Object.values(item.objectTypes).reduce((a, b) => a + b, 0);

		let progress = 0;

		const gradient = Object.entries(item.objectTypes)
			.map(([objectType, items]) => {
				const a = `${getColor(objectType)} ${progress * 100}%`;
				progress += items / totalItems;
				const b = `${getColor(objectType)} ${progress * 100}%`;
				return [a, b];
			})
			.flat()
			.join(', ');

		const background = `linear-gradient(
        to right,          /* direction */
				${gradient}
    );`;

		return background;
	});

	function getColor(objectType) {
		switch (objectType) {
			case '4186':
				return 'var(--color-type-object-book)';
			case '4187':
				return 'var(--color-type-object-article)';
			case '4184':
				return 'var(--color-type-object-periodical)';
			case '4185':
				return 'var(--color-type-object-newsletter)';
			case '4190':
				return 'var(--color-type-object-video)';
			default:
				return 'var(--color-type-object)';
		}
	}

	let hovering = $state(false);
</script>

<div class={`col-span-3 row-span-3 grid grid-rows-[auto_1fr] bg-white`}>
	<Snippet snippets={item.snippets} {href} {searchTerm} dataType="creator" />

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
				{background}
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
