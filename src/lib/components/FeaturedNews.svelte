<script>
	import { onMount } from 'svelte';
	import { getLocale } from '$lib/paraglide/runtime';
	import TextOutlined from '$lib/components/TextOutlined.svelte';

	let { slug = 'news', site = 'main', base = 'https://minjian-danganguan.org' } = $props();

	let title = $state('');
	let call = $state(null);
	let lang = $derived(getLocale());
	let apiSlug = $derived(`${slug}-${lang}`);
	let reqId = 0;
	let controller = null;

	async function load() {
		const myId = ++reqId;
		controller?.abort();
		controller = new AbortController();
		const url = new URL(`${base}/api/site_pages`);
		url.searchParams.set('site', site);
		url.searchParams.set('slug', apiSlug);
		let res;
		try {
			res = await fetch(url, { signal: controller.signal });
		} catch {
			return;
		}
		if (myId !== reqId) return;
		if (!res.ok) return;
		const pages = await res.json();
		const page = pages?.[0];
		if (!page) return;
		title = page['o:title'] ?? '';
		const block = (page['o:block'] || []).find((b) => b['o:layout'] === 'call-to-action');
		call = block?.['o:data'] ?? null;
	}

	onMount(load);

	$effect(() => {
		apiSlug;
		load();
	});
</script>

{#if call?.header}
	{#if call?.button_link}
		<a href={call.button_link} class="col-span-4 row-span-auto block p-1">
			<h3 class="p-2 text-2xl leading-tight font-medium hover:bg-brand-black">
				<TextOutlined class="mb-1 ">
					{call.header}
				</TextOutlined>

				{#if call?.subheader}<p class="mt-2">{call.subheader}</p>{/if}
			</h3></a
		>
	{:else}
		<div class="col-span-3 row-span-2 block border-1 bg-brand-grayblue p-1">
			<h3 class="p-2 text-2xl leading-tight font-medium">
				<TextOutlined class="mb-1">
					{call.header}
				</TextOutlined>
			</h3>
			{#if call?.subheader}<p class="mt-2">{call.subheader}</p>{/if}
		</div>
	{/if}
{/if}
