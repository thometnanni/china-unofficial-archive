<script>
	import { onMount } from 'svelte';
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import Hero from '$lib/components/Hero.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';

	let lang = $derived(getLocale());
	let lines = $derived(lang === 'zh' ? ['zh', 'en'] : ['en', 'zh']);
	const splashImages = [
		'intro/1fb378c2aa01bec8d45cdd0f3f218dd7a86b7624.webp',
		'intro/58c4e5afa6ac1b19599eab1c4cf8726d40f13355.webp',
		'intro/90013809d93d8128b50db66dc6d308db88240086.webp',
		'intro/a033ef9956aaa4a9bcace1c6de9e8dde1611d87d.webp',
		'intro/a4224ce2467fd14fdc3c200414c081d4930e5bc7.webp',
		'intro/b512cf7688c9accc46263a5ba4b6525aa0a25ac4.webp',
		'intro/baaced0ab3bd9d8a3cf8eb6f8ffc1fbb5fb9ec10.webp',
		'intro/cbf06d99411180cefe892fcf98aebab3ee5e5301.webp',
		'intro/d067e9f57229c6331e311f1d55f3d2d819e54311.webp',
		'intro/e2e611470791d99cd6f3de94477f2e18dcf636d6.webp',
		'intro/e97c3adb5b462db98eb7535a63a69fe3b23abaa7.webp',
		'intro/f5fb5445465a38f5a8de60a479afd8f9470426a0.webp'
	];
</script>

<section class="tilesSection" style="height:100dvh;">
	<Hero height={'100dvh'} {splashImages} />
	{#key lang}
		<div class="textContainer">
			{#each lines as l, i}
				{#if l === 'zh'}
					<h2 class="line zhLine">
						<!-- <TextOutlined
							>唯一非营利性的 <span class="nowrap">中国独立思想档案库</span></TextOutlined
						> -->
						<span><TextOutlined>{m.slogan(null, { locale: 'zh' })}</TextOutlined></span>
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
		/* text-indent: 2rem; */
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
			font-size: 1.7rem;
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
