<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { setLocale } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';

	let splashImages = [];

	onMount(async () => {
		const images = await query('splash-images');
		splashImages = [...images].sort(() => Math.random() - 0.5);
	});

	function rescale(node) {
		const rnd = (min, max) => min + Math.random() * (max - min);

		async function waitForPixels(img) {
			if (img.decode) {
				try {
					await img.decode();
				} catch {}
			}
			let t = 0;
			while ((!img.naturalWidth || !img.naturalHeight) && t < 10) {
				await new Promise((r) => requestAnimationFrame(r));
				t++;
			}
			return img.naturalWidth && img.naturalHeight;
		}

		const place = async () => {
			const parent = node.parentElement;
			if (!parent) return;
			const ok = await waitForPixels(node);
			if (!ok) return;

			const scale = rnd(0.2, 0.6);
			const ratio = node.naturalWidth / node.naturalHeight;
			const maxW = parent.clientWidth * scale;
			const maxH = parent.clientHeight * scale;

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
			node.style.position = 'absolute';

			const pad = 10;
			const maxX = Math.max(pad, parent.clientWidth - w - pad);
			const maxY = Math.max(pad, parent.clientHeight - h - pad);
			node.style.left = rnd(pad, maxX) + 'px';
			node.style.top = rnd(pad, maxY) + 'px';
			node.style.zIndex = String(1 + ((Math.random() * 3) | 0));

			node.classList.add('is-ready');
		};

		if (node.complete) place();
		else node.addEventListener('load', place, { once: true });

		const onIter = () => place();
		node.addEventListener('animationiteration', onIter);

		return {
			destroy() {
				node.removeEventListener('animationiteration', onIter);
			}
		};
	}

	function inkFilter(node, options = {}) {
		const defaults = {
			thr: 83,
			noise: 20,
			ink: [0, 0, 0],
			paper: [244, 244, 244],
			bandAmp: 10,
			bandPeriod: 50,
			jitterMax: 1
		};
		let settings = normalize({ ...defaults, ...options });
		let processed = false;

		function toRGB(c) {
			if (Array.isArray(c)) return c.slice(0, 3).map((n) => Math.max(0, Math.min(255, n | 0)));
			if (typeof c !== 'string') return [0, 0, 0];
			let s = c.trim();
			if (s[0] === '#') {
				let hex = s.slice(1);
				if (hex.length === 3)
					hex = hex
						.split('')
						.map((ch) => ch + ch)
						.join('');
				const n = parseInt(hex, 16);
				return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
			}
			let m = s.match(/rgba?\s*\((\d+)[^0-9]+(\d+)[^0-9]+(\d+)/i);
			if (m) return [+m[1], +m[2], +m[3]];
			if (!toRGB._ctx) toRGB._ctx = document.createElement('canvas').getContext('2d');
			const ctx = toRGB._ctx;
			ctx.fillStyle = '#000';
			ctx.fillStyle = s;
			const norm = ctx.fillStyle;
			if (norm[0] === '#') return toRGB(norm);
			m = norm.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
			return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
		}

		function normalize(obj) {
			return { ...obj, ink: toRGB(obj.ink), paper: toRGB(obj.paper) };
		}

		const gauss = (s) => {
			const u = Math.random(),
				v = Math.random();
			return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * s;
		};

		async function ensureDecoded(img) {
			if (img.decode) {
				try {
					await img.decode();
				} catch {}
			}
			let tries = 0;
			while ((!img.naturalWidth || !img.naturalHeight) && tries < 10) {
				await new Promise((r) => requestAnimationFrame(r));
				tries++;
			}
		}

		async function apply() {
			if (processed) return;
			await ensureDecoded(node);

			const w = node.naturalWidth,
				h = node.naturalHeight;
			if (!w || !h) return;

			node.style.visibility = 'hidden';

			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d', { willReadFrequently: true });
			canvas.width = w;
			canvas.height = h;
			ctx.drawImage(node, 0, 0);

			let src;
			try {
				src = ctx.getImageData(0, 0, w, h);
			} catch {
				node.style.visibility = '';
				return;
			}

			const dst = ctx.createImageData(w, h);
			const sdata = src.data,
				ddata = dst.data;

			const rowShift = new Int8Array(h);
			for (let y = 0; y < h; y++)
				rowShift[y] = ((Math.random() * (2 * settings.jitterMax + 1)) | 0) - settings.jitterMax;

			for (let y = 0; y < h; y++) {
				const band =
					settings.bandAmp * Math.sin((2 * Math.PI * y) / settings.bandPeriod) +
					(Math.random() - 0.5) * 2;
				const dx = rowShift[y];
				for (let x = 0; x < w; x++) {
					const sx = x - dx;
					let v = 255;
					if (sx >= 0 && sx < w) {
						const si = (y * w + sx) * 4;
						v = (sdata[si] + sdata[si + 1] + sdata[si + 2]) / 3;
					}
					v = Math.max(0, Math.min(255, v + band + gauss(settings.noise)));
					const isInk = v < settings.thr;
					const di = (y * w + x) * 4;
					ddata[di] = isInk ? settings.ink[0] : settings.paper[0];
					ddata[di + 1] = isInk ? settings.ink[1] : settings.paper[1];
					ddata[di + 2] = isInk ? settings.ink[2] : settings.paper[2];
					ddata[di + 3] = 255;
				}
			}

			ctx.putImageData(dst, 0, 0);

			try {
				const url = canvas.toDataURL('image/png');
				const onSwap = () => {
					node.removeEventListener('load', onSwap);
					node.style.visibility = '';
					processed = true;
				};
				node.addEventListener('load', onSwap);
				node.src = url;
			} catch {
				node.style.visibility = '';
			}
		}

		if (node.complete) apply();
		else node.addEventListener('load', apply, { once: true });

		return {
			update(newOpts) {
				settings = normalize({ ...settings, ...newOpts });
			},
			destroy() {
				/* noop */
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
				use:inkFilter={{ ink: '#000', paper: '#faf8f0', bandAmp: 15, noise: 20 }}
				class="tile select-none"
				style="--i:{i}"
			/>
		{/each}
	</div>

	<h2
		class="zh absolute top-4 left-4 z-10 bg-gray-100 px-2 text-2xl font-medium text-black sm:left-6 md:left-8"
	>
		{m.slogan(null, { locale: 'zh' })}
	</h2>

	<h2
		class="en absolute right-4 bottom-20 z-10 bg-gray-100 px-2 text-2xl font-medium text-black sm:right-6 md:right-8"
	>
		{m.slogan(null, { locale: 'en' })}
	</h2>

	<div class="z-20 mb-4 flex gap-4">
		<button
			class="zh bg-gray-100 px-4 py-1 hover:bg-black hover:text-white"
			on:click={() => setLocale('zh')}
		>
			{m.enter(null, { locale: 'zh' })}
		</button>
		<button
			class="en bg-gray-100 px-4 py-1 hover:bg-black hover:text-white"
			on:click={() => setLocale('en')}
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
		will-change: opacity, left, top, width, height, transform;
		mix-blend-mode: multiply;
	}

	:global(.tile.is-ready) {
		animation: fade 10s linear infinite;
		animation-delay: calc(var(--i) * 2s - 3s);
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
