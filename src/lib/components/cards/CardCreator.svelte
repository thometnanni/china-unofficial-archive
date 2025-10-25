<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '../TextOutlined.svelte';
	let { item, href } = $props();
	const hasImage = Boolean(item?.thumbnail);

	let isOdd = $derived(Boolean(item.id % 2));
</script>

<a {href} class="card col-span-4 row-span-4 border border-card-primary">
	<div class="relative h-full p-1">
		<ImageFilter src={item.thumbnail} color="var(--color-card-primary)" {isOdd} />
		<TextOutlined
			as="h3"
			class="absolute right-[calc(var(--spacing)_*_-4)] bottom-4 text-right text-xl"
		>
			{item.title}
		</TextOutlined>
	</div>
</a>

<style>
	.card {
		--color-card-primary: var(--color-type-creator);
	}
</style>
