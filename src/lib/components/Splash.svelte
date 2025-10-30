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
	let heroStyle = $state('');
	let unbind = null;
	let titleTopPx = $state(0);

	function scheduleNext() {
		if (!splashImages.length) return;
		clearTimeout(timer);
		const d = holdMs[currentIndex] ?? 5000;
		timer = setTimeout(() => {
			currentIndex = (currentIndex + 1) % splashImages.length;
			scheduleNext();
		}, d);
	}

	function setLockedHeight() {
		const h = window.visualViewport?.height ? document.documentElement.clientHeight : 1;
		heroStyle = `height:${Math.round(h * 0.85)}px`;
		const vh = window.innerHeight || document.documentElement.clientHeight || 0;
		titleTopPx = Math.round(vh * 0.4);
	}

	let t = null;
	function debounceSet() {
		if (t) cancelAnimationFrame(t);
		t = requestAnimationFrame(setLockedHeight);
	}

	onMount(async () => {
		const images = await query('splash-images');
		splashImages = [...images].sort(() => Math.random() - 0.5);
		holdMs = splashImages.map(() => Math.floor(3000 + Math.random() * 3000));
		currentIndex = 0;
		scheduleNext();
		if (browser) {
			debounceSet();
			const onOrient = () => debounceSet();
			const onShow = () => debounceSet();
			window.addEventListener('orientationchange', onOrient, { passive: true });
			window.addEventListener('pageshow', onShow, { passive: true });
			unbind = () => {
				window.removeEventListener('orientationchange', onOrient);
				window.removeEventListener('pageshow', onShow);
			};
		}
	});
	onDestroy(() => {
		clearTimeout(timer);
		if (unbind) unbind();
	});
</script>

<section
	bind:this={splashEl}
	class="relative flex w-svw flex-col items-center justify-end overflow-hidden border-b bg-brand-cover p-1 sm:min-h-[85vh]"
	style={heroStyle}
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

	{#key lang}
		<div class="absolute inset-x-0 sm:hidden" style={`top:${titleTopPx}px`}>
			{#if lang === 'zh'}
				<h2 class="zh z-10 mx-auto max-w-[640px] px-2 text-left indent-10 text-3xl text-black">
					<TextOutlined
						>唯一非营利性的 <span class="text-nowrap">中国独立思想档案库</span></TextOutlined
					>
				</h2>
				<h2 class="en z-10 mx-auto mt-4 max-w-[640px] px-2 text-left indent-10 text-3xl text-black">
					<span class="bg-gray-100"
						><TextOutlined>{m.slogan(null, { locale: 'en' })}</TextOutlined></span
					>
				</h2>
			{:else}
				<h2 class="en z-10 mx-auto max-w-[640px] px-2 text-left indent-10 text-3xl text-black">
					<span class="bg-gray-100"
						><TextOutlined>{m.slogan(null, { locale: 'en' })}</TextOutlined></span
					>
				</h2>
				<h2 class="zh z-10 mx-auto mt-4 max-w-[640px] px-2 text-left indent-10 text-3xl text-black">
					<TextOutlined
						>唯一非营利性的 <span class="text-nowrap">中国独立思想档案库</span></TextOutlined
					>
				</h2>
			{/if}
		</div>

		<div class="hidden sm:block">
			<div class="sm:absolute sm:right-0 sm:bottom-62">
				{#if lang === 'zh'}
					<h2 class="zh z-10 mx-auto max-w-[640px] px-2 text-left indent-10 text-4xl text-black">
						<TextOutlined
							>唯一非营利性的 <span class="text-nowrap">中国独立思想档案库</span></TextOutlined
						>
					</h2>
				{:else}
					<h2 class="en z-10 mx-auto max-w-[640px] px-2 text-left indent-10 text-4xl text-black">
						<span class="bg-gray-100"
							><TextOutlined>{m.slogan(null, { locale: 'en' })}</TextOutlined></span
						>
					</h2>
				{/if}
			</div>

			<div class="sm:absolute sm:top-60 sm:left-10">
				{#if lang === 'zh'}
					<h2 class="en z-10 mx-auto max-w-[640px] px-2 text-left indent-10 text-4xl text-black">
						<span class="bg-gray-100"
							><TextOutlined>{m.slogan(null, { locale: 'en' })}</TextOutlined></span
						>
					</h2>
				{:else}
					<h2 class="zh z-10 mx-auto max-w-[640px] px-2 text-left indent-10 text-4xl text-black">
						<TextOutlined
							>唯一非营利性的 <span class="text-nowrap">中国独立思想档案库</span></TextOutlined
						>
					</h2>
				{/if}
			</div>
		</div>
	{/key}
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
