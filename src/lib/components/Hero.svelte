<script>
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import { page } from '$app/stores';

	const defaultHero =
		'https://minjian-danganguan.org/files/original/a033ef9956aaa4a9bcace1c6de9e8dde1611d87d.jpg';

	function pickHeroFromData(p) {
		if (p.route.id !== '/archive/[[id]]') return null;
		const d = p.data?.item;
		if (!d) return null;
		const check = (i) => i && /\.(jpe?g|png)$/i.test(i);
		const tryUrl =
			d?.media?.find((m) => check(m?.url))?.url ||
			(Array.isArray(d?.items) ? d.items[0]?.media?.find((m) => check(m?.url))?.url : null) ||
			(check(d?.thumbnail) ? d.thumbnail : null);
		return tryUrl || null;
	}

	let heroSrc = $derived(pickHeroFromData($page) || defaultHero);
</script>

<div class="pointer-events-none h-[350px]" style="--color-card-primary: var(--color-brand-purple);">
	<ImageFilter src={heroSrc} fit="cover" objectPosition="10% left" />
</div>
