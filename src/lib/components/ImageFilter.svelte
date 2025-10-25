<script>
	import noise from '$lib/assets/noise.png';
	import { createEventDispatcher } from 'svelte';

	const { src, alt = '', fit = 'contain', isOdd = false } = $props();
	const dispatch = createEventDispatcher();

	function onImgLoad(e) {
		const img = e.target;
		const w = img.naturalWidth || 1;
		const h = img.naturalHeight || 1;
		dispatch('ratio', { isPortrait: h > w });
	}
</script>

<div class="block h-full w-full overflow-hidden bg-card-primary">
	<div class="container h-full">
		<div class="filters">
			<div class="noise" style="background-image:url({noise})"></div>
			<div class="waves"></div>
		</div>
		{#if src}
			<img
				{src}
				{alt}
				onload={onImgLoad}
				style={`object-fit:${fit}; object-position:${isOdd ? 'bottom right' : 'top left'}`}
			/>
		{/if}
	</div>
</div>

<style>
	.container {
		position: relative;
		mix-blend-mode: screen;
		filter: contrast(10);
		image-rendering: pixelated;
		max-width: unset;
	}
	.container div {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.noise {
		background-size: 25%;
		filter: brightness(0.5);
		mix-blend-mode: color-dodge;
	}
	.waves {
		background: linear-gradient(0deg, black 0%, white 25%, black 50%, white 75%, black 100%);
		background-size: 100px 100px;
		opacity: 0.2;
		mix-blend-mode: screen;
	}
	.filters {
		mix-blend-mode: screen;
	}
	img {
		background-color: white;
		height: 100%;
		width: 100%;
		display: block;
		filter: grayscale() contrast(1.5) brightness(0.5);
	}
</style>
