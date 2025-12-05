<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { hoverable } from '$lib/actions/hoverable';

	let { href = '#', title = '', image = '/hero.jpg' } = $props();
	let hovering = $state(false);
</script>

<a
	{href}
	class="card group relative col-span-3 row-span-1 block h-fit min-h-[100px] w-fit max-w-[80vw] overflow-hidden bg-white text-white sm:max-w-[400px]"
	class:hovering
	use:hoverable
	onhover-start={() => (hovering = true)}
	onhover-end={() => (hovering = false)}
>
	<div class="absolute inset-0 border border-brand bg-white p-1">
		<ImageFilter src={image} fit="cover" objectPosition="center" disabled={hovering} />
	</div>

	<div class="relative z-10 flex h-full flex-col justify-end gap-2 p-4">
		{#if title}
			<TextOutlined class="text-2xl text-card-primary">{title}</TextOutlined>
		{/if}
	</div>
</a>

<style>
	.card {
		--color-card-primary: var(--color-brand-purple);
	}
	.card.hovering {
		--color-outlined-border: var(--color-white);
		--color-outlined-bg: var(--color-card-primary);
		--color-outlined-text: var(--color-white);
	}
</style>
