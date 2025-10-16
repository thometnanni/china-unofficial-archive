<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '../TextOutlined.svelte';
	let { item, i = 0 } = $props();
	const odd = i % 2 === 1;
</script>

<a
	href={localizeHref('/archive/' + item.id)}
	class="card col-span-3 row-span-3 grid grid-cols-3 grid-rows-3 gap-8"
>
	<div class="col-[1/3] row-[1/4] border border-card-primary">
		<div class="relative h-full p-1">
			<ImageFilter src={item.thumbnail} alt={item.title} />

			{#if item.objectType}
				<div class="absolute top-1 left-[calc(var(--spacing)_*_-4)] text-balance">
					{#each item.objectType as objectType}
						<TextOutlined class="mb-1">
							{objectType.title}
						</TextOutlined>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	{#if item.title}
		<TextOutlined as="h3" class="z-0 col-[2/4] row-[1/4] mb-2 ml-4 items-end">
			{item.title}
		</TextOutlined>
	{/if}
</a>

<style>
	.card {
		--color-card-primary: var(--color-type-object);
	}
</style>
