<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref, setLocale } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { inkFilter } from '$lib/filter.js';

	let splashImages = [];
	onMount(async () => {
		const images = await query('splash-images');
		splashImages = [...images].sort(() => Math.random() - 0.5);
	});

	function rescale(node) {
		const rnd = (min, max) => min + Math.random() * (max - min);

		const apply = () => {
			const parent = node.parentElement;
			if (!parent) return;

			const naturalW = node.naturalWidth;
			const naturalH = node.naturalHeight;

			const scale = rnd(0.4, 0.8);

			const maxW = parent.clientWidth * scale;
			const maxH = parent.clientHeight * scale;
			const ratio = naturalW / naturalH;

			let w, h;
			if (maxW / ratio <= maxH) {
				w = maxW;
				h = maxW / ratio;
			} else {
				h = maxH;
				w = maxH * ratio;
			}

			node.style.width = w + 'px';
			node.style.height = h + 'px';

			const maxX = parent.clientWidth - w - 10;
			const maxY = parent.clientHeight - h - 10;
			const x = rnd(0, Math.max(10, maxX));
			const y = rnd(0, Math.max(10, maxY));

			node.style.left = x + 'px';
			node.style.top = y + 'px';
			node.style.position = 'absolute';
			node.style.zIndex = String(1 + ((Math.random() * 3) | 0));
		};

		if (node.complete) {
			apply();
		} else {
			node.addEventListener('load', apply, { once: true });
		}

		node.addEventListener('animationiteration', apply);

		return {
			destroy() {
				node.removeEventListener('animationiteration', apply);
			}
		};
	}
</script>

<section
	class="relative flex h-[80vh] w-svw flex-col items-center justify-end overflow-hidden bg-brand-cream p-1"
>
	<div class="absolute inset-0">
		{#each splashImages as src, i}
			<img
				{src}
				alt="splash"
				crossorigin="anonymous"
				use:rescale
				use:inkFilter={{
					ink: '#000',
					paper: '#faf8f0',
					bandAmp: 15,
					noise: 20
				}}
				class="tile"
				style="--i:{i}"
			/>
		{/each}
	</div>

	<h2
		class="zh absolute top-4 left-4 z-10 bg-gray-100 px-2 text-2xl font-medium text-black sm:left-6 md:left-2"
	>
		{m.slogan(null, { locale: 'zh' })}
	</h2>

	<h2
		class="en absolute right-4 bottom-20 z-10 bg-gray-100 px-2 text-2xl font-medium text-black sm:right-6 md:right-2"
	>
		{m.slogan(null, { locale: 'en' })}
	</h2>

	<div class="z-20 mb-4 flex gap-4">
		<button
			class="zh bg-gray-100 px-4 py-1 hover:bg-black hover:text-white"
			onclick={() => setLocale('zh')}
		>
			{m.enter(null, { locale: 'zh' })}
		</button>
		<button
			class="en bg-gray-100 px-4 py-1 hover:bg-black hover:text-white"
			onclick={() => setLocale('en')}
		>
			{m.enter(null, { locale: 'en' })}
		</button>
	</div>
</section>

<style>
	.tile {
		position: absolute;
		object-fit: cover;
		object-position: center;
		opacity: 0;
		animation: fade 10s linear infinite;
		/* filter: grayscale(100%); */
		mix-blend-mode: multiply;
		animation-delay: calc(var(--i) * 1.5s);
	}

	@keyframes fade {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
