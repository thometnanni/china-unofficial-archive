<script>
	import PdfPreview from '$lib/components/previews/PdfPreview.svelte';
	import VideoPreview from '$lib/components/previews/VideoPreview.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';

	let { medias = [], initialIndex = 0 } = $props();

	let item = $derived($page.data.item);

	let selectedIndex = $state(initialIndex);
	let lang = $derived(getLocale());

	function isYoutube(med) {
		const s = String(med?.filename || med?.url || '');
		return s.includes('youtube.com') || s.includes('youtu.be');
	}
	function isVideo(med) {
		const t = med?.type || '';
		const s = String(med?.filename || med?.url || '');
		return t.startsWith('video') || /\.(mp4|webm|mov|ogg)$/i.test(s);
	}
	function isPdf(med) {
		return (med?.type || '') === 'application/pdf';
	}

	function isImage(med) {
		const t = med?.type || '';
		const s = String(med?.filename || med?.url || '');
		return t.startsWith('image') || /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(s);
	}
	function labelFor(med) {
		if (isPdf(med)) return m.pdf?.(null, { locale: lang }) ?? 'PDF';
		if (isYoutube(med)) return m.youtube?.(null, { locale: lang }) ?? 'YouTube';
		if (isVideo(med)) return m.video?.(null, { locale: lang }) ?? 'Video';
		return m.image?.(null, { locale: lang }) ?? 'Image';
	}

	let nonImageMedias = $derived(
		medias.filter((med) => isPdf(med) || isYoutube(med) || isVideo(med))
	);
	let displayedMedias = $derived(nonImageMedias.length ? nonImageMedias : medias.filter(isImage));
	let selected = $derived(displayedMedias?.[selectedIndex]);

	$effect(() => {
		if (selectedIndex >= displayedMedias.length) selectedIndex = 0;
	});
</script>

<section class="m-auto max-w-[840px]">
	{#if displayedMedias.length > 0}
		<div class="flex flex-wrap items-center justify-between">
			<div class="flex flex-wrap gap-2">
				{#each displayedMedias as med, i}
					<button
						class="cursor-pointer px-3 py-1 text-sm {i === selectedIndex
							? 'bg-black text-white'
							: 'bg-gray-200 hover:bg-gray-300'}"
						onclick={() => (selectedIndex = i)}
					>
						{labelFor(med)}
					</button>
				{/each}
			</div>

			{#if selected.url || selected.filename}
				<a
					href={selected.url || selected.filename}
					target="_blank"
					rel="noopener noreferrer"
					class="bg-gay bg-gray-200 px-2 text-xl hover:text-black"
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
