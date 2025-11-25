<script>
	import { hoverable } from '$lib/actions/hoverable';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '../TextOutlined.svelte';
	let { item, href } = $props();

	let hovering = $state(false);
</script>

<a
	{href}
	class="card group col-span-3 row-span-1 border border-card-primary bg-white"
	class:hovering
	data-type={item.type}
	use:hoverable
	onhover-start={() => (hovering = true)}
	onhover-end={() => (hovering = false)}
>
	<div class="relative h-full p-1">
		<ImageFilter disabled={hovering} />
		<TextOutlined as="h3" class="absolute top-2 left-[calc(var(--spacing)_*_-4)] text-balance">
			{item.title}
		</TextOutlined>
	</div>
</a>

<style>
	.card {
		--color-card-primary: var(--color-type-default);
	}

	.card[data-type='era'] {
		--color-card-primary: var(--color-type-era);
	}
	.card.hovering {
		--color-outlined-border: var(--color-white);
		--color-outlined-bg: var(--color-card-primary);
		--color-outlined-text: var(--color-white);
	}
</style>
