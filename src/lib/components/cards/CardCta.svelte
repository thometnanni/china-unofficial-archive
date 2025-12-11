<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';

	let { href = '#', title = '', image = '/hero.jpg' } = $props();
</script>

<a
	{href}
	class="card group relative col-span-3 row-span-1 block h-fit max-h-[120px] w-fit max-w-[80vw] overflow-hidden bg-white text-white sm:max-w-[400px]"
>
	<div class="pointer-events-none absolute inset-0 border border-brand bg-white p-1">
		<ImageFilter src={image} fit="cover" objectPosition="center" />
	</div>

	<div class="pointer-events-none relative z-10 flex h-full flex-col justify-end gap-2 p-4">
		{#if title}
			<TextOutlined class="text-2xl text-card-primary">{title}</TextOutlined>
		{/if}
	</div>
</a>

<style>
	.card {
		--color-card-primary: var(--color-brand-purple);
	}
</style>
