<script>
	import { browser } from '$app/environment';
	let pdfjsLib = $state();

	let canvas = $state();

	if (browser) {
		// Lazy import to prevent SSR from choking
		import('pdfjs-dist').then(async (mod) => {
			pdfjsLib = mod;
			pdfjsLib.GlobalWorkerOptions.workerSrc = `/workers/pdf.worker.js`;
		});
	}

	// import {get}

	let { media } = $props();

	// 	var loadingTask = pdfjsLib.getDocument('helloworld.pdf');
	// loadingTask.promise.then(function(pdf) {
	//   // you can now use *pdf* here
	// });

	// const loadingTask =

	$effect(async () => {
		if (pdfjsLib == null) return;
		const doc = await pdfjsLib.getDocument(media.url).promise;
		await renderPage(doc);
	});

	async function renderPage(pdfDoc) {
		const page = await pdfDoc.getPage(1);
		const viewport = page.getViewport({ scale: 1 });
		const ctx = canvas.getContext('2d');

		canvas.width = viewport.width;
		canvas.height = viewport.height;

		await page.render({ canvasContext: ctx, viewport }).promise;
	}
</script>

<canvas bind:this={canvas}></canvas>
