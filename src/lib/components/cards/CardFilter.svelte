<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '../TextOutlined.svelte';
	let { item, href } = $props();
</script>

<a {href} class={['card col-span-3 row-span-1 border border-card-primary', item.type]}>
	<div class="relative h-full p-1">
		<ImageFilter />
		<TextOutlined as="h3" class="absolute top-2 left-[calc(var(--spacing)_*_-4)] text-balance">
			{item.title}
		</TextOutlined>
	</div>
</a>

<style>
	.era {
		--color-card-primary: var(--color-type-era);
	}
</style>
