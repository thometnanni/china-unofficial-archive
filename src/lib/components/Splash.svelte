<script>
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { setLocale, getLocale } from '$lib/paraglide/runtime';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Logo from '$lib/components/Logo.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';

	let splashImages = $derived([]);
	let splashEl;
	let lang = $derived(getLocale());
	let currentIndex = $state(0);
	let holdMs = $state([]);
	let timer = $state(null);
	let fadeMs = 3000;
	let heroStyle = $state('');
	let unbind = null;
	let lines = $derived(lang === 'zh' ? ['zh', 'en'] : ['en', 'zh']);

	function scheduleNext() {
		if (!splashImages.length) return;
		clearTimeout(timer);
		const d = holdMs[currentIndex] ?? 5000;
		timer = setTimeout(() => {
			currentIndex = (currentIndex + 1) % splashImages.length;
			scheduleNext();
		}, d);
	}

	function setLockedHeight() {
		const h = window.visualViewport?.height ? document.documentElement.clientHeight : 1;
		heroStyle = `height:${Math.round(h * 0.85)}px`;
	}

	let t = null;
	function debounceSet() {
		if (t) cancelAnimationFrame(t);
		t = requestAnimationFrame(setLockedHeight);
	}

	onMount(async () => {
		const images = await query('splash-images');
		splashImages = [...images].sort(() => Math.random() - 0.5);
		holdMs = splashImages.map(() => Math.floor(3000 + Math.random() * 3000));
		currentIndex = 0;
		scheduleNext();
		if (browser) {
			debounceSet();
			const onOrient = () => debounceSet();
			const onShow = () => debounceSet();
			window.addEventListener('orientationchange', onOrient, { passive: true });
			window.addEventListener('pageshow', onShow, { passive: true });
			unbind = () => {
				window.removeEventListener('orientationchange', onOrient);
				window.removeEventListener('pageshow', onShow);
			};
		}
	});
	onDestroy(() => {
		clearTimeout(timer);
		if (unbind) unbind();
	});
</script>

<section bind:this={splashEl} class="tilesSection" style={heroStyle}>
	<div class="tilesWrap">
		{#if splashImages.length > 0}
			{#each splashImages as src, i}
				<div
					class="tile"
					style="opacity:{currentIndex === i ? 1 : 0}; transition: opacity {fadeMs}ms ease;"
				>
					<ImageFilter {src} fit="cover" scrollReveal={false} />
				</div>
			{/each}
		{/if}
	</div>

	{#key lang}
		<div class="textContainer">
			{#each lines as l, i}
				{#if l === 'zh'}
					<h2 class="line zhLine">
						<TextOutlined
							>唯一非营利性的 <span class="nowrap">中国独立思想档案库</span></TextOutlined
						>
					</h2>
				{:else}
					<h2 class="line enLine">
						<span class="enBg"><TextOutlined>{m.slogan(null, { locale: 'en' })}</TextOutlined></span
						>
					</h2>
				{/if}
			{/each}
		</div>
	{/key}
</section>

<style>
	h2 {
		--color-card-primary: var(--color-brand-cover);
	}
	.tilesSection {
		position: relative;
		width: 100vw;
		overflow: hidden;
		background-color: var(--color-brand-cover);
		border-bottom: 1px solid var(--color-brand-cover);
	}
	.tilesWrap {
		pointer-events: none;
		position: absolute;
		inset: 0;
	}
	.tile {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		--color-card-primary: var(--color-brand-cover);
		background-color: var(--color-brand-cover);
	}
	.textContainer {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: min(95vw, 1100px);
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 1.2rem;
		text-indent: 2rem;
	}
	
	.line {
		max-width: 640px;
		font-size: 1.5rem;
		line-height: 1.2;
		color: #000;
		justify-self: center;
	}
	.line:first-child {
		justify-self: start;
		text-align: left;
	}
	.line:nth-child(2) {
		justify-self: end;
		text-align: right;
	}
	.nowrap {
		white-space: nowrap;
	}
	.enBg {
		background: #f3f4f6;
	}
	@media (min-width: 840px) {
		.textContainer {
			grid-template-columns: 1fr 1fr;
			column-gap: 2rem;
			align-items: center;
		}
		.line {
			font-size: 2.25rem;
		}
		.line:first-child {
			justify-self: start;
			text-align: left;
			transform: translateY(-5vh);
		}
		.line:nth-child(2) {
			justify-self: end;
			text-align: right;
			transform: translateY(5vh);
		}
	}
</style>
