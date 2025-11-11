<script>
	import { onMount } from 'svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import { query } from '$lib/api';
	import ImageFilter from '$lib/components/ImageFilter.svelte';

	let { title = '', html = null, splashImages = [] } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<main class="min-h-screen">
	<div class="tile">
		<ImageFilter
			src="https://minjian-danganguan.org/files/original/a033ef9956aaa4a9bcace1c6de9e8dde1611d87d.jpg"
			color="var(--color-brand-primary)"
			fit="cover"
			scrollReveal={false}
		/>
	</div>

	<section class="mx-auto prose bg-white px-10 py-8">
		<h1 class="mb-4">{title}</h1>
		{#if html != ''}
			<article>{@html html}</article>
		{/if}
	</section>
</main>

<style>
	.tile {
		position: fixed;
		z-index: -100;
		inset: 0;
		width: 100%;
		height: 100%;
		--color-card-primary: var(--color-brand-cover);
		background-color: var(--color-brand-cover);
	}

	.tile :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
	}

	section {
		max-width: 800px;
		margin: 0 auto;
	}
</style>
