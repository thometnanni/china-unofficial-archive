<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { setLocale, getLocale } from '$lib/paraglide/runtime';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Logo from '$lib/components/Logo.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';

	let splashImages = $derived([]);
	let splashEl;
	let lang = $derived(getLocale());
	let currentIndex = $state(0);
	let holdMs = $state([]);
	let timer = $state(null);
	let fadeMs = 3000;

	function scheduleNext() {
		if (!splashImages.length) return;
		clearTimeout(timer);
		const d = holdMs[currentIndex] ?? 5000;
		timer = setTimeout(() => {
			currentIndex = (currentIndex + 1) % splashImages.length;
			scheduleNext();
		}, d);
	}

	onMount(async () => {
		const images = await query('splash-images');
		splashImages = [...images].sort(() => Math.random() - 0.5);
		holdMs = splashImages.map(() => Math.floor(3000 + Math.random() * 3000));
		currentIndex = 0;
		scheduleNext();
	});

	onDestroy(() => {
		clearTimeout(timer);
	});
</script>

<section
	bind:this={splashEl}
	class="relative flex h-[85dvh] w-svw flex-col items-center justify-end overflow-hidden border-b bg-brand-cover p-1"
>
	<div class="pointer-events-none absolute -inset-1">
		{#if splashImages.length > 0}
			{#each splashImages as src, i}
				<div
					class="tile dither"
					style="opacity:{currentIndex === i ? 1 : 0}; transition: opacity {fadeMs}ms ease;"
				>
					<ImageFilter {src} fit="cover" scrollReveal={false} />
				</div>
			{/each}
		{/if}
	</div>

	<div class="flex flex-col-reverse sm:flex-col">
		{#if lang === 'zh'}
			<h2
				class="en z-10 mx-auto mt-12 max-w-[640px] px-2 text-left indent-10 text-3xl text-black sm:absolute sm:right-4 sm:bottom-62 sm:mt-0 sm:text-left sm:text-4xl"
			>
				<span class="bg-gray-100">
					<TextOutlined>{m.slogan(null, { locale: 'en' })}</TextOutlined>
				</span>
			</h2>
			<h2
				class="zh z-10 mx-auto mt-6 mb-28 max-w-[640px] px-2 text-left indent-10 text-3xl text-black sm:absolute sm:top-60 sm:left-4 sm:mt-0 sm:mb-0 sm:text-4xl"
			>
				<TextOutlined>
					唯一非营利性的 <span class="text-nowrap">中国独立思想档案库</span>
				</TextOutlined>
			</h2>
		{:else}
			<h2
				class="en z-10 mx-auto mt-12 max-w-[640px] px-2 text-left indent-10 text-3xl text-black sm:absolute sm:right-4 sm:bottom-62 sm:mt-0 sm:text-left sm:text-4xl"
			>
				<span class="bg-gray-100">
					<TextOutlined>
						唯一非营利性的 <span class="text-nowrap">中国独立思想档案库</span>
					</TextOutlined>
				</span>
			</h2>
			<h2
				class="zh z-10 mx-auto mt-6 mb-28 max-w-[640px] px-2 text-left indent-10 text-3xl text-black sm:absolute sm:top-60 sm:left-4 sm:mt-0 sm:mb-0 sm:text-4xl"
			>
				<TextOutlined>{m.slogan(null, { locale: 'en' })}</TextOutlined>
			</h2>
		{/if}
	</div>
</section>

<style>
	h2 {
		--color-card-primary: var(--color-brand-cover);
	}
	.tile {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		--color-card-primary: var(--color-brand-cover);
		background-color: var(--color-brand-cover);
	}
</style>
