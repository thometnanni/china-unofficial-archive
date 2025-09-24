<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { setLocale } from '$lib/paraglide/runtime';
	import { onMount, tick } from 'svelte';
	import { inkFilter } from '$lib/filter.js';
	import { browser } from '$app/environment';

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
	class="relative flex h-[80vh] w-svw flex-col items-center justify-end overflow-hidden border-b bg-brand-cream p-1"
>
	<div class="pointer-events-none absolute inset-0">
		{#each splashImages as src, i}
			<img
				{src}
				alt="splash"
				crossorigin="anonymous"
				use:inkFilter={{ ink: '#9773b0', paper: '#ecebd9', bandAmp: 15, noise: 20 }}
				class="tile dither"
				style="--i:{i}; --count:{splashImages.length}"
			/>
		{/each}
	</div>

	<h2
		class="zh absolute top-4 left-4 z-10 bg-gray-100 px-2 text-3xl font-medium text-black sm:left-6 md:left-2"
	>
		{m.slogan(null, { locale: 'zh' })}
	</h2>

	<h2
		class="en absolute right-4 bottom-20 z-10 bg-gray-100 px-2 text-3xl font-medium text-black sm:right-6 md:right-2"
	>
		{m.slogan(null, { locale: 'en' })}
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
		transition: opacity 10s ease;
		animation: fade calc(var(--count) * 6s) linear infinite;
		animation-delay: calc(var(--i) * 6s);
	}

	@keyframes fade {
		0% {
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
