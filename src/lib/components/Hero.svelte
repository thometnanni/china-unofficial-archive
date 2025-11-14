<script>
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';

	let {
		images = [],
		fadeMs = 3000,
		intervalMs = 5000,
		height = '350px;',
		class: className = '',
		fit = 'cover',
		objectPosition = '10% left'
	} = $props();

	function pickHeroFromData(p) {
		if (p.route.id !== '/archive/[[id]]') return null;
		const d = p.data?.item;
		if (!d) return null;
		const check = (i) => i && /\.(jpe?g|png|webp)$/i.test(i);
		const tryUrl =
			d?.media?.find((m) => check(m?.url))?.url ||
			(Array.isArray(d?.items) ? d.items[0]?.media?.find((m) => check(m?.url))?.url : null) ||
			(check(d?.thumbnail) ? d.thumbnail : null);
		return tryUrl || null;
	}

	let currentIndex = $state(0);
	let timer = null;
	let fallbackHero = '/hero.jpg';
	let heroSrc = $derived(
		images.length > 0
			? (images[currentIndex] ?? fallbackHero)
			: pickHeroFromData($page) || fallbackHero
	);

	$effect(() => {
		clearTimeout(timer);
		if (images.length < 2) {
			currentIndex = 0;
			return;
		}

		currentIndex = 0;
		const duration = Number.isFinite(intervalMs) && intervalMs > 0 ? intervalMs : 5000;

		const rotate = () => {
			timer = setTimeout(() => {
				currentIndex = (currentIndex + 1) % images.length;
				rotate();
			}, duration);
		};

		rotate();

		return () => clearTimeout(timer);
	});

	onDestroy(() => {
		clearTimeout(timer);
	});
</script>

<div
	class={`hero-root pointer-events-none overflow-hidden border-b  border-[var(--color-card-primary)] ${className}`}
	style={`--color-card-primary: var(--color-brand-purple); height:${height}`}
>
	{#if images.length}
		<div class="hero-slides">
			{#each images as src, i}
				<div
					class="hero-slide"
					style={`opacity:${currentIndex === i ? 1 : 0}; transition: opacity ${fadeMs}ms ease;`}
				>
					<ImageFilter {src} {fit} {objectPosition} scrollReveal={false} />
				</div>
			{/each}
		</div>
	{:else}
		<ImageFilter src={heroSrc} {fit} {objectPosition} />
	{/if}
</div>

<style>
	.hero-root {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.hero-slides,
	.hero-slide {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
</style>
