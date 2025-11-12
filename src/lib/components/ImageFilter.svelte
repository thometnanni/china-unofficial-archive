<script>
	import noise from '$lib/assets/noise.png';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	const {
		src,
		alt = '',
		fit = 'contain',
		objectPosition = 'center center',
		scrollReveal = true
	} = $props();

	const dispatch = createEventDispatcher();
	let isTouch = $state(false);
	let showOriginal = $state(false);
	let hostEl;

	function onImgLoad(e) {
		const img = e.target;
		const w = img.naturalWidth || 1;
		const h = img.naturalHeight || 1;
		dispatch('ratio', { isPortrait: h > w });
	}

	let observer;
	function updateOriginal() {
		if (!hostEl) return;
		const r = hostEl.getBoundingClientRect();
		const vh = window.innerHeight || 1;
		const mid = (r.top + r.bottom) / 2;
		const ratio = mid / vh;
		showOriginal = isTouch && scrollReveal && ratio > 0.4 && ratio < 0.6;
	}

	function setupObserver(node) {
		if (!scrollReveal) return;
		const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
		observer = new IntersectionObserver(() => updateOriginal(), { threshold: thresholds });
		observer.observe(node);
		window.addEventListener('resize', updateOriginal, { passive: true });
		window.addEventListener('scroll', updateOriginal, { passive: true });
		return {
			destroy() {
				if (observer) observer.disconnect();
				window.removeEventListener('resize', updateOriginal);
				window.removeEventListener('scroll', updateOriginal);
			}
		};
	}

	onMount(() => {
		isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
		if (scrollReveal) updateOriginal();
	});
	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<div
	use:setupObserver
	bind:this={hostEl}
	class="group relative block h-full w-full overflow-hidden bg-card-primary"
	class:originalActive={showOriginal}
>
	<div class="container h-full">
		<div class="filters group-hover:opacity-0">
			<div class="noise" style="background-image:url({noise})"></div>
			<div class="waves"></div>
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

	{#if src}
		<img
			{src}
			{alt}
			style={`object-fit:${fit}; object-position:${objectPosition}`}
			class="original pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		/>
	{/if}
</div>

<style>
	@media (hover: none) {
		.group.originalActive .filters {
			opacity: 0;
		}
		.group.originalActive .original {
			opacity: 1;
		}
		.group .filters,
		.group .original {
			/* transition: opacity 0.3s ease; */
		}
	}

	.container {
		position: relative;
		mix-blend-mode: screen;
		filter: contrast(5);
		max-width: unset;
		transition: all 0.4s ease;
	}
	.container div {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
		transition: opacity 0.4s ease;
	}
	.noise {
		background-size: 128px;
		filter: brightness(0.4);
		mix-blend-mode: color-dodge;
	}
	.waves {
		background: linear-gradient(
			0deg,
			black 0%,
			gainsboro 25%,
			black 50%,
			gainsboro 75%,
			black 100%
		);
		background-size: 80% 80%;
		opacity: 0.2;
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

	.original {
		mix-blend-mode: normal !important;
		filter: none !important;
		background-color: transparent;
		display: block;
	}
</style>
