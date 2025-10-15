<script>
	import noise from '$lib/assets/noise.png';
	const { src, alt, color } = $props();
</script>

<div class="col-span-2 row-span-2 h-full w-full overflow-hidden" style="background-color: {color}">
	<div class="container h-full">
		<div class="filters">
			<div class="noise" style="background-image: url({noise})"></div>
			<div class="waves"></div>
		</div>
		{#if src != null}
			<img {src} {alt} />
		{/if}
	</div>
</div>

<style>
	.container {
		position: relative;
		mix-blend-mode: screen;
		filter: contrast(10);

		div {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 1;
		}

		.noise {
			background-size: 50%;
			filter: brightness(0.6);
			mix-blend-mode: color-dodge;
		}

		.waves {
			background: linear-gradient(45deg, black 0%, white 25%, black 50%, white 75%, black 100%);
			background-size: 100px 100px;
			opacity: 0.2;
			mix-blend-mode: screen;
		}

		.filters {
			mix-blend-mode: screen;
		}

		img {
			display: block;
			filter: grayscale() contrast(1.5) brightness(0.5);
		}
	}
</style>
