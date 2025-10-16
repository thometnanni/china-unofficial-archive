<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '../TextOutlined.svelte';
	let { item, i = 0 } = $props();
	const odd = i % 2 === 1;
	const hasImage = Boolean(item?.thumbnail);
</script>

<a
	href={localizeHref(`/archive/${item.id}`)}
	class="card col-span-4 row-span-4 border border-card-primary"
>
	<div class="relative h-full p-1">
		<ImageFilter src={item.thumbnail} color="var(--color-card-primary)" />
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

		/* Add these styles */
	}
</style>
