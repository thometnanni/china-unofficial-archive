<script>
	import PdfPreview from '$lib/components/previews/PdfPreview.svelte';
	import VideoPreview from '$lib/components/previews/VideoPreview.svelte';

	let { medias = [], item, initialIndex = 0 } = $props();
	let selectedIndex = $state(initialIndex);

	function isYoutube(m) {
		const s = String(m?.filename || m?.url || '');
		return s.includes('youtube.com') || s.includes('youtu.be');
	}
	function isVideo(m) {
		const t = m?.type || '';
		const s = String(m?.filename || m?.url || '');
		return t.startsWith('video') || /\.(mp4|webm|mov|ogg)$/i.test(s);
	}
	function isPdf(m) {
		return (m?.type || '') === 'application/pdf';
	}
	function isImage(m) {
		const t = m?.type || '';
		const s = String(m?.filename || m?.url || '');
		return t.startsWith('image') || /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(s);
	}

	let nonImageMedias = $derived(medias.filter((m) => isPdf(m) || isYoutube(m) || isVideo(m)));
	let displayedMedias = $derived(nonImageMedias.length ? nonImageMedias : medias.filter(isImage));
	let selected = $derived(displayedMedias?.[selectedIndex]);

	$effect(() => {
		if (selectedIndex >= displayedMedias.length) selectedIndex = 0;
	});
</script>

<section class="m-2">
	{#if displayedMedias.length > 0}
		<div class="flex flex-wrap items-center justify-between">
			<div class="flex flex-wrap gap-2">
				{#each displayedMedias as m, i}
					<button
						class="cursor-pointer px-3 py-1 text-sm {i === selectedIndex
							? 'bg-black text-white'
							: 'bg-gray-200 hover:bg-gray-300'} "
						onclick={() => (selectedIndex = i)}
					>
						{isPdf(m) ? 'PDF' : isYoutube(m) ? 'YouTube' : isVideo(m) ? 'Video' : 'Image'}
					</button>
				{/each}
			</div>

			{#if selected.url || selected.filename}
				<a
					href={selected.url || selected.filename}
					target="_blank"
					rel="noopener noreferrer"
					class="bg-gay px-2 text-xl bg-gray-200 hover:text-black"
				>
					↗
				</a>
			{/if}
		</div>

		{#if selected}
			<div class="bg-black p-0.5">
				{#if isPdf(selected)}
					{#key selected.url || selected.filename}
						<PdfPreview media={selected} />
					{/key}
				{:else if isYoutube(selected) || isVideo(selected)}
					{#key selected.url || selected.filename}
						<VideoPreview media={selected} />
					{/key}
				{:else}
					{#key selected.url || selected.filename}
						<img
							src={(selected.url || selected.filename) ?? ''}
							alt={selected.title || ''}
							class="w-full"
						/>
					{/key}
				{/if}
			</div>
		{/if}
	{:else}
		<div class="bg-black p-0.5">
			<img src={item.thumbnail} alt={item.title || ''} class="w-full" />
		</div>
	{/if}
</section>
