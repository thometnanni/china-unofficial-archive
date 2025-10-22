<script>
	import { browser } from '$app/environment';
	import { tick } from 'svelte';
	let pdfjsLib = $state();
	let pdfDoc = $state();
	let pages = $state([]);
	let isLoading = $state(false);
	let loadProgress = $state(0);
	let { media } = $props();
	let maxConcurrent = 2;
	let active = 0;
	let pending = [];
	function enqueue(fn) {
		if (!pending.includes(fn)) pending.push(fn);
		drain();
	}
	async function drain() {
		if (active >= maxConcurrent) return;
		const job = pending.shift();
		if (!job) return;
		active += 1;
		try {
			await job();
		} finally {
			active -= 1;
			if (pending.length) drain();
		}
	}
	$effect(() => {
		if (!browser) return;
		import('pdfjs-dist').then(async (mod) => {
			pdfjsLib = mod;
			pdfjsLib.GlobalWorkerOptions.workerSrc = '/workers/pdf.worker.js';
		});
	});
	$effect(async () => {
		if (!pdfjsLib || !media?.url) return;
		isLoading = true;
		loadProgress = 0;
		const loadingTask = pdfjsLib.getDocument({
			url: media.url,
			disableAutoFetch: true,
			disableStream: true
		});
		loadingTask.onProgress = (e) => {
			loadProgress = e.total ? Math.round((e.loaded / e.total) * 100) : 0;
		};
		pdfDoc = await loadingTask.promise;
		pages = Array.from({ length: pdfDoc.numPages }, (_, i) => ({
			index: i + 1,
			ready: false,
			rendering: false,
			error: false,
			canvas: null,
			width: 0,
			inView: false,
			token: null
		}));
		isLoading = false;
	});
	$effect(async () => {
		if (!pdfDoc || pages.length === 0) return;
		await tick();
		if (!pages[0].ready) {
			pages[0].inView = true;
			enqueue(() => renderPage(pages[0], 1, true));
		}
	});
	async function renderPage(p, ratio = 0, force = false) {
		if (!pdfDoc || !p.canvas || p.rendering || p.ready || (!force && (!p.inView || ratio < 0.6)))
			return;
		const token = Symbol();
		p.token = token;
		p.rendering = true;
		// console.log('start', p.index);
		try {
			const page = await pdfDoc.getPage(p.index);
			if (p.token !== token || (!force && !p.inView)) {
				page.cleanup();
				throw new Error('stale');
			}
			const base = page.getViewport({ scale: 1 });
			const r = Math.max(1, (p.width || 1) / base.width);
			const viewport = page.getViewport({ scale: (window.devicePixelRatio ?? 1) * r });
			const ctx = p.canvas.getContext('2d', { alpha: false });
			p.canvas.width = viewport.width;
			p.canvas.height = viewport.height;
			await page.render({ canvasContext: ctx, viewport }).promise;
			page.cleanup();
			if (p.token === token && p.inView) {
				p.ready = true;
				// console.log('done', p.index);
			}
		} catch (e) {
			if (!e || e.message !== 'stale') {
				p.error = true;
				// console.log('error', p.index, e);
			}
		} finally {
			p.rendering = false;
		}
	}
	function unloadPage(p) {
		if (!p?.canvas) return;
		p.token = null;
		p.ready = false;
		p.canvas.width = 0;
		p.canvas.height = 0;
	}
	function io(node, p) {
		const thresholds = [0, 0.1, 0.25, 0.5, 0.6, 0.75, 1];
		const i = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						p.inView = true;
						const ratio = e.intersectionRatio;
						enqueue(() => renderPage(p, ratio));
					} else {
						p.inView = false;
						unloadPage(p);
					}
				}
			},
			{ root: null, rootMargin: '0px', threshold: thresholds }
		);
		i.observe(node);
		return {
			destroy() {
				i.disconnect();
			}
		};
	}
	function ro(node, p) {
		const r = new ResizeObserver(() => {
			if (!p.canvas) return;
			const w = node.clientWidth;
			if (w && Math.abs(w - p.width) > 2) {
				p.width = w;
				if (p.inView) {
					p.ready = false;
					enqueue(() => renderPage(p, 1));
					// console.log('rerender', p.index);
				}
			}
		});
		r.observe(node);
		return {
			destroy() {
				r.disconnect();
			}
		};
	}
</script>

<div class="h-full overflow-scroll bg-gray-200">
	{#if isLoading}
		<div class="flex h-full items-center justify-center">
			<span class="text-2xl">{loadProgress}%</span>
		</div>
	{/if}
	{#each pages as p (p.index)}
		<div use:io={p} use:ro={p}>
			{#if !p.ready && !p.error}
				<div style="aspect-ratio:3/4"></div>
			{/if}
			{#if !p.error}
				<canvas
					bind:this={p.canvas}
					bind:clientWidth={p.width}
					style="width:100%;display:{p.ready ? 'block' : 'none'}"
				></canvas>
			{/if}
		</div>
	{/each}
</div>
