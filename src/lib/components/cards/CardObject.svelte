<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '../TextOutlined.svelte';
	let { item, href } = $props();
	let isPortrait = $state(true);

	function onRatio(e) {
		isPortrait = e.detail.isPortrait;
	}
</script>

<a
	{href}
	class={`card grid gap-8 ${
		isPortrait
			? 'col-span-3 row-span-3 grid-cols-3 grid-rows-3'
			: 'col-span-4 row-span-4 grid-cols-4 grid-rows-4'
	}`}
>
	<div
		class={`${
			isPortrait ? 'col-[1/3] row-[1/4]' : 'col-[1/4] row-[1/3]'
		} border border-card-primary`}
	>
		<div class="relative h-full p-1">
			<ImageFilter src={item.thumbnail} alt={item.title} on:ratio={onRatio} fit="cover" />

			{#if item.objectType}
				<div class="absolute top-1 left-[calc(var(--spacing)_*_-4)] text-balance">
					{#each item.objectType as objectType}
						<TextOutlined class="mb-1">{objectType.title}</TextOutlined>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	{#if item.title}
		<TextOutlined
			as="h3"
			class={isPortrait
				? 'z-0 col-[2/4] row-[1/4] mb-2 ml-4 items-end'
				: 'z-0 col-[3/5] row-[2/3] mb-2 ml-4 items-end'}
		>
			{item.title}
		</TextOutlined>
	{/if}
</a>

<style>
	.card {
		--color-card-primary: var(--color-type-object);
	}
</style>
