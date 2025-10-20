<script>
	import { onMount } from 'svelte';
	import { getLocale } from '$lib/paraglide/runtime';


	BASE_URL_OMEKA

	let { slug, site = 'main', base = 'https://minjian-danganguan.org' } = $props();

	let title = $state('');
	let html = $state('');
	let notFound = $state(false);

	let lang = $derived(getLocale());
	let apiSlug = $derived(`${slug}-${lang}`);

	let reqId = 0;
	let controller = null;

	async function load() {
		const myId = ++reqId;
		controller?.abort();
		controller = new AbortController();
		notFound = false;

		const url = new URL(`${base}/api/site_pages`);
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
		base;
		load();
	});
</script>

{#if notFound}
	<section class="py-10 text-center">
		<h1 class="text-3xl font-bold">404</h1>
	</section>
{:else}
	<section class="mx-auto prose px-10 py-8">
		<h1 class="mb-4">{title}</h1>
		<article>{@html html}</article>
	</section>
{/if}
