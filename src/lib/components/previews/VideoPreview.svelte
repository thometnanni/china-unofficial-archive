<script>
	let { media } = $props();

	function getYoutubeId(u) {
		if (!u) return '';
		const s = String(u);
		const m1 = s.match(/[?&]v=([^&?#]+)/i);
		if (m1 && m1[1]) return m1[1];
		const m2 = s.match(/youtu\.be\/([^?&#/]+)/i);
		if (m2 && m2[1]) return m2[1];
		const m3 = s.match(/youtube\.com\/shorts\/([^?&#/]+)/i);
		if (m3 && m3[1]) return m3[1];
		return '';
	}

	let raw = $derived(typeof media === 'string' ? media : media?.filename || media?.url || '');
	let vid = $derived(getYoutubeId(raw));
	let isYoutube = $derived(!!vid);
	let isVideoFile = $derived(/\.(mp4|webm|mov|ogg)$/i.test(raw));
	let embed = $derived(
		isYoutube ? `https://www.youtube.com/embed/${vid}?playsinline=1&rel=0` : null
	);
	let file = $derived(!isYoutube && isVideoFile ? raw : media?.url);
</script>

<section class="h-[400px]">
	{#if isYoutube}
		<iframe
			src={embed}
			class="aspect-video h-[100%] border-0"
			allow="autoplay; encrypted-media"
			allowfullscreen
		></iframe>
	{:else if isVideoFile && file}
		<video src={file} controls playsinline class="asppect-video h-[100%]"></video>
	{/if}
</section>
