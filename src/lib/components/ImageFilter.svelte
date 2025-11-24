<script>
	import noise from '$lib/assets/noise.png';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	const {
		src,
		alt = '',
		fit = 'contain',
		objectPosition = 'center center',
		disabled = false,
		fade = false,
		background
	} = $props();

	const dispatch = createEventDispatcher();

	function onImgLoad(e) {
		const img = e.target;
		const w = img.naturalWidth || 1;
		const h = img.naturalHeight || 1;
		dispatch('ratio', { isPortrait: h > w });
	}
</script>

<div
	class="image-filter relative block h-full w-full overflow-hidden bg-card-primary"
	class:originalActive={disabled}
	style={background != null && `background-image:${background}`}
>
	<div class="container h-full">
		<div class="filters">
			<div class="noise" style="background-image:url({noise})"></div>
			<div class="waves"></div>
			{#if fade}
				<div class="fade"></div>
			{/if}
		</div>
		{#if src}
			<img
				{src}
				{alt}
				onload={onImgLoad}
				style={`object-fit:${fit}; object-position:${objectPosition}`}
				class="edited"
			/>
		{/if}
	</div>

	{#if src && disabled}
		<img
			{src}
			{alt}
			style={`object-fit:${fit}; object-position:${objectPosition}`}
			class="original pointer-events-none absolute inset-0 h-full w-full"
		/>
	{/if}
</div>

<style>
	/* .image-filter.originalActive .filters {
		opacity: 0;
	} */
	.image-filter.originalActive .original {
		opacity: 1;
	}

	.container {
		position: relative;
		mix-blend-mode: screen;
		filter: contrast(5);
		max-width: unset;
		/* transition: all 0.4s ease; */
		div {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 1;
			/* transition: opacity 0.4s ease; */
		}
		.noise {
			background-size: 128px;
			filter: brightness(0.4);
			mix-blend-mode: color-dodge;
		}
		.waves {
			background: linear-gradient(0deg, black 0%, white 25%, black 50%, white 75%, black 100%);
			opacity: 0.2;
			mix-blend-mode: screen;
		}
		.fade {
			height: 50%;
			bottom: 0;
			background: linear-gradient(180deg, black 0%, rgb(160, 160, 160) 100%);
			opacity: 1;
			mix-blend-mode: screen;
		}
		.filters {
			mix-blend-mode: screen;
		}
		.edited {
			background-color: white;
			height: 100%;
			width: 100%;
			display: block;
			filter: grayscale() contrast(1.5) brightness(0.5);
		}
	}
	.original {
		mix-blend-mode: normal !important;
		filter: none !important;
		background-color: transparent;
		display: block;
	}
</style>
