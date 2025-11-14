<script>
	import { onMount } from 'svelte';
	import { query } from '$lib/api';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import Hero from '$lib/components/Hero.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';

	let splashImages = $state([]);
	let lang = $derived(getLocale());
	let lines = $derived(lang === 'zh' ? ['zh', 'en'] : ['en', 'zh']);

	onMount(async () => {
		const images = await query('splash-images');
		splashImages = [...images].sort(() => Math.random() - 0.5);
	});
</script>

<section class="tilesSection" style="height:85dvh;">
	{#if splashImages.length > 0}
		<Hero images={splashImages} height={'85dvh'} />
	{/if}
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
