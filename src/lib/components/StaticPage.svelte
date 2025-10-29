<script>
	import { onMount } from 'svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import { BASE_URL_OMEKA } from '$lib/api';
	import { query } from '$lib/api';

	let { slug, site = 'china-unofficial-new' } = $props();

	let title = $state('');
	let html = $state('');
	let notFound = $state(false);

	let lang = $derived(getLocale());
	// let apiSlug = $derived(() => `${slug}-${lang}`);
	let apiSlug = $derived(`${slug}-${lang}`);

	let reqId = 0;
	let controller = null;

	async function load() {
		const myId = ++reqId;
		controller?.abort();
		controller = new AbortController();
		notFound = false;

		const url = new URL(`${BASE_URL_OMEKA}/site_pages`);
		url.searchParams.set('site', site);
		url.searchParams.set('slug', apiSlug);

		let res;
		try {
			res = await fetch(url, { signal: controller.signal });
		} catch (e) {
			return;
		}
		if (myId !== reqId) return;

		if (!res.ok) {
			notFound = true;
			return;
		}

		const pages = await res.json();
		const page = pages?.[0];
		if (!page) {
			notFound = true;
			return;
		}

		title = page['o:title'] ?? '';
		const block = (page['o:block'] || []).find((b) => b['o:layout'] === 'html');
		html = block?.['o:data']?.html ?? '';
	}

	onMount(load);

	$effect(() => {
		apiSlug;
		site;
		load();
	});

	import ImageFilter from '$lib/components/ImageFilter.svelte';
	let splashImages = $derived([]);

	onMount(async () => {
		const images = await query('splash-images');
		splashImages = [...images].sort(() => Math.random() - 0.5);
	});
</script>

<main class="min-h-screen">
	<div class="tile">
		<ImageFilter
			src={splashImages[0]}
			color="var(--color-brand-primary)"
			fit="cover"
			scrollReveal={false}
		/>
	</div>

	{#if html != ''}
		{#if notFound}
			<section class="bg-white py-10 text-center">
				<h1 class="text-3xl font-bold">404</h1>
			</section>
		{:else}
			<section class="mx-auto prose bg-white px-10 py-8">
				<h1 class="mb-4">{title}</h1>
				<article>{@html html}</article>
			</section>
		{/if}
	{/if}
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
