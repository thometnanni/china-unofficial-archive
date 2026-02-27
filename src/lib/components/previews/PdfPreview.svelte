<script>
	import { browser } from '$app/environment';
	import { m } from '$lib/paraglide/messages';
	let pdfjsLib = $state();

	let canvas = $state();

	let height = $state(400);

	if (browser) {
		// Lazy import to prevent SSR from choking
		import('pdfjs-dist').then(async (mod) => {
			pdfjsLib = mod;
			pdfjsLib.GlobalWorkerOptions.workerSrc = `/workers/pdf.worker.js`;
		});
	}

	// import {get}

	let { media } = $props();

	let totalPages = $state(0);
	let loading = $state(true);

	$effect(async () => {
		if (pdfjsLib == null) return;
		const doc = await pdfjsLib.getDocument({
			url: media.url,
			cMapUrl: '/cmaps/',
			cMapPacked: true
		}).promise;
		loading = true;
		await renderPage(doc);
	});

	async function renderPage(pdfDoc) {
		canvas.width = 100;
		totalPages = pdfDoc.numPages;
		const maxPages = Math.min(totalPages, 3);
		const gap = 16;

		const pages = await Promise.all(
			Array.from({ length: maxPages }, (_, i) => pdfDoc.getPage(i + 1))
		);

		let totalWidth = 0;
		const pagesAndViewports = pages.map((page, i) => {
			const { height: pageHeight } = page.getViewport({ scale: 1 });
			const ratio = height / pageHeight;

			const viewport = page.getViewport({
				scale: (window.devicePixelRatio ?? 1) * ratio,
				offsetX: totalWidth + i * gap
			});

			totalWidth += viewport.width;

			return { page, viewport };
		});

		const ctx = canvas.getContext('2d');

		canvas.width = totalWidth;
		canvas.height = height * (window.devicePixelRatio ?? 1);

		for (let i = 0; i < maxPages; i++) {
			const { page, viewport } = pagesAndViewports[i];
			await page.render({
				canvasContext: ctx,
				viewport,
				renderInteractiveForms: false,
				background: 'transparent',
				intent: 'display'
			}).promise;
		}
		loading = false;
	}
</script>

<a
	href={media.url}
	class="relative block h-[400px] border border-brand bg-brand/5 p-2"
	bind:clientHeight={height}
	target="_blank"
	aria-label={`download ${media.title ?? media.filename}`}
>
	<canvas alt={media.title ?? media.filename} width="100" class="h-[100%]" bind:this={canvas}
	></canvas>
	{#if loading}
		<div class="absolute top-0 flex h-full w-full items-center justify-center">
			<div class="">{m.loading()}</div>
		</div>
	{:else}
		<div class="absolute right-1 bottom-1 border border-brand bg-white px-1">
			{totalPages} pages
		</div>
	{/if}
</a>
