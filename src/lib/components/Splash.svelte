<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { setLocale } from '$lib/paraglide/runtime';
	import { onMount, tick } from 'svelte';
	import { inkFilter } from '$lib/filter.js';
	import { browser } from '$app/environment';
	import Logo from '$lib/components/Logo.svelte';

	let splashImages = [];
	let splashEl;

	const scrollBelowSplash = async () => {
		await tick();
		const h = splashEl?.offsetHeight ?? 0;
		if (h > 0) window.scrollTo({ top: h, behavior: 'smooth' });
	};

	function currentLocaleFromPath() {
		if (!browser) return '';
		const seg = location.pathname.split('/')[1] || '';
		return seg;
	}

	function changeLang(next) {
		const cur = currentLocaleFromPath();
		if (browser && cur === next) {
			scrollBelowSplash();
			return;
		}
		if (browser) sessionStorage.setItem('scrollTo', 'menu');
		setLocale(next);
	}

	onMount(async () => {
		const images = await query('splash-images');
		splashImages = [...images].sort(() => Math.random() - 0.5);

		if (!browser) return;
		if (sessionStorage.getItem('scrollTo') === 'menu') {
			sessionStorage.removeItem('scrollTo');
			scrollBelowSplash();
		}
	});
</script>

<section
	bind:this={splashEl}
	class="relative flex h-[100dvh] w-svw flex-col items-center justify-end overflow-hidden border-b bg-brand-cream p-1"
>
	<div class="pointer-events-none absolute inset-0">
		{#if splashImages.length > 0}
			{#each splashImages as src, i}
				<img
					{src}
					alt="splash"
					crossorigin="anonymous"
					use:inkFilter={{ ink: '#9773b0', paper: '#ecebd9', thr: 80, bandAmp: 10, noise: 20 }}
					class="tile dither"
					style="--i:{i}; --count:{splashImages.length}"
				/>
			{/each}
		{/if}
	</div>

	<div class="absolute top-4 right-4 w-[200px] max-w-[220px] bg-gray-100">
		<Logo />
	</div>

	<h2
		class="zh z-10 mx-auto mt-12 max-w-[640px] px-2 text-left indent-10
         text-3xl text-black sm:absolute
         sm:top-60 sm:left-4 sm:mt-0 sm:text-4xl"
	>
		<span class="bg-gray-100">
			{m.slogan(null, { locale: 'zh' })}
		</span>
	</h2>

	<h2
		class="en z-10 mx-auto mt-6 mb-28 max-w-[640px] px-2 text-left
         indent-10 text-3xl text-black sm:absolute sm:right-4
         sm:bottom-62 sm:mt-0 sm:mb-0 sm:text-left sm:text-4xl"
	>
		<span class="bg-gray-100">
			{m.slogan(null, { locale: 'en' })}
		</span>
	</h2>

	<div class="z-20 mb-4 flex gap-4">
		<button
			class="zh bg-gray-100 px-4 py-1 hover:cursor-pointer hover:bg-black hover:text-white"
			on:click={() => changeLang('zh')}
		>
			{m.lang(null, { locale: 'zh' })}
		</button>
		<button
			class="en bg-gray-100 px-4 py-1 hover:cursor-pointer hover:bg-black hover:text-white"
			on:click={() => changeLang('en')}
		>
			{m.lang(null, { locale: 'en' })}
		</button>
	</div>
</section>

<style>
	.tile {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 0;
		animation-name: fade;
		animation-duration: calc(var(--count) * 6s);
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-delay: calc(-6s * var(--i));
		animation-fill-mode: both;
		will-change: opacity;
		backface-visibility: hidden;
	}

	@keyframes fade {
		0% {
			opacity: 0;
		}
		5% {
			opacity: 1;
		}
		95% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
