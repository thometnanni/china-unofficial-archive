<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';

	let { href = '#', stretch = false, target = '', title = '', image = '/hero.webp' } = $props();
</script>

<a
	{href}
	{target}
	class="group relative col-span-2 row-span-2 block w-[var(--cardSize)] min-w-[var(--cardSize)] overflow-hidden bg-white text-white"
>
	<div class="pointer-events-none absolute inset-0 border border-brand bg-white p-1">
		<ImageFilter src={image} fit="cover" objectPosition="center" />
	</div>

	<div class="pointer-events-none relative z-10 flex h-full flex-col justify-end gap-2 p-4">
		{#if title}
			<TextOutlined class="text-4xl text-card-primary">{title}</TextOutlined>
		{/if}
	</div>
</a>

<style>
	.group {
		--color-card-primary: var(--color-brand-purple);
	}
</style>
