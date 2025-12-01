<script>
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let {
		fadeMs = 3000,
		intervalMs = 5000,
		height = '350px;',
		fit = 'cover',
		objectPosition = 'center 40%'
	} = $props();

	let index = $state(0);
	let timer = null;

	const isCreator = $derived($page.data?.item?.type === 'creator');
	let images = $derived(isCreator ? ['/hero.jpg'] : ($page.data.heroes ?? ['/hero.jpg']));

	const [send, receive] = crossfade({
		duration: fadeMs,
		easing: quintOut
	});

	const interval = setInterval(() => {
		index = (index + 1) % images.length;
	}, intervalMs);
	onDestroy(() => clearInterval(interval));
</script>

<div
	class={`hero-root pointer-events-none z-[-1] mb-[-100px] overflow-hidden`}
	style={`--color-card-primary: var(--color-brand-purple); height:${height}`}
>
	<div class="hero-slides">
		{#each images as src, i}
			{#if i === index}
				<div class="hero-slide" in:receive|local out:send|local>
					<ImageFilter {src} {fit} {objectPosition} scrollReveal={false} fade />
				</div>
			{/if}
		{/each}
	</div>
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
