<script>
	import { browser } from '$app/environment';
	let pdfjsLib = $state();
	let pdfDoc = $state();
	let pages = $state([]);
	let isLoading = $state(false);
	let loadProgress = $state(0);
	let scroller = $state();
	let { media } = $props();

	if (browser) {
		// Lazy import to prevent SSR from choking
		import('pdfjs-dist').then(async (mod) => {
			pdfjsLib = mod;
			pdfjsLib.GlobalWorkerOptions.workerSrc = '/workers/pdf.worker.js';
		});
	}

	// import {get}
	// 	var loadingTask = pdfjsLib.getDocument('helloworld.pdf');
	// loadingTask.promise.then(function(pdf) {
	//   // you can now use *pdf* here
	// });

	// const loadingTask =
	$effect(async () => {
		if (!pdfjsLib || !media?.url) return;
		isLoading = true;
		loadProgress = 0;
		const loadingTask = pdfjsLib.getDocument(media.url);
		loadingTask.onProgress = (e) => {
			loadProgress = e.total ? Math.round((e.loaded / e.total) * 100) : 0;
		};
		pdfDoc = await loadingTask.promise;
		pages = Array.from({ length: pdfDoc.numPages }, (_, i) => ({
			index: i + 1,
			ready: false,
			error: false,
			canvas: null,
			width: 0,
			rendering: false
		}));
		isLoading = false;
	});

	async function renderPage(p) {
		if (!pdfDoc || !p?.canvas || p.rendering) return;
		p.rendering = true;
		try {
			const page = await pdfDoc.getPage(p.index);
			const { width: docWidth } = page.getViewport({ scale: 1 });
			const ratio = Math.max(1, (p.width || 1) / docWidth);
			const viewport = page.getViewport({ scale: (window.devicePixelRatio ?? 1) * ratio });
			const ctx = p.canvas.getContext('2d');
			p.canvas.width = viewport.width;
			p.canvas.height = viewport.height;
			await page.render({ canvasContext: ctx, viewport }).promise;
			p.ready = true;
		} catch {
			p.error = true;
		} finally {
			p.rendering = false;
		}
	}

	function io(node, p) {
		const i = new IntersectionObserver(
			(es) => {
				es.forEach((e) => {
					if (e.isIntersecting) renderPage(p);
				});
			},
			{ root: scroller, rootMargin: '800px 0px' }
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
				p.ready = false;
				renderPage(p);
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

<div class="relative max-h-[100dvh] overflow-y-auto" bind:this={scroller}>
	{#if isLoading}
		<div class="absolute inset-0 flex h-full items-center justify-center bg-gray-200">
			<span class="text-2xl">{loadProgress}%</span>
		</div>
	{/if}

	<div class="w-full space-y-6">
		{#each pages as p (p.index)}
			<div class="w-full" use:io={p} use:ro={p}>
				{#if p.error}{:else}
					{#if !p.ready}
						<div class="aspect-[3/4] w-full bg-gray-200"></div>
					{/if}
					<canvas
						class={`w-full ${!p.ready ? 'hidden' : ''}`}
						bind:this={p.canvas}
						bind:clientWidth={p.width}
					></canvas>
				{/if}
			</div>
		{/each}
	</div>
</div>
