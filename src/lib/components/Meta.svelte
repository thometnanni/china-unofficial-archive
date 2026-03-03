<script>
	import { page } from '$app/stores';
	import { m } from '$lib/paraglide/messages';
	import { deLocalizeUrl, localizeUrl } from '$lib/paraglide/runtime';
	let {
		title = m.title(),
		metaTitle = m.title(),
		description = m.slogan(),
		image = '/cover.webp',
		type = 'website',
		noindex = false
	} = $props();
	const url = $derived($page.url.href);
</script>

<svelte:head>
	<title>{title}</title>
	<link rel="alternate" hreflang="zh" href={localizeUrl(url, { locale: 'zh' })} />
	<link rel="alternate" hreflang="en" href={localizeUrl(url, { locale: 'en' })} />
	<link rel="alternate" hreflang="x-default" href={deLocalizeUrl(url)} />
	<meta name="description" content={description} />
	{#if noindex}<meta name="robots" content="noindex,nofollow" />{/if}
	<link rel="canonical" href={url} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={description} />
	{#if image}<meta property="og:image" content={image} />{/if}
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metaTitle} />
	<meta name="twitter:description" content={description} />
	{#if image}<meta name="twitter:image" content={image} />{/if}
</svelte:head>
