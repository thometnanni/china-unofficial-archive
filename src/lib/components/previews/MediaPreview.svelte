<script>
	import PdfPreview from '$lib/components/previews/PdfPreview.svelte';
	import VideoPreview from '$lib/components/previews/VideoPreview.svelte';
	import { m } from '$lib/paraglide/messages';
	import { page } from '$app/stores';
	import Gallery from '$lib/components/Gallery.svelte';

	let { medias = [], initialIndex = 0 } = $props();

	function isYoutube(media) {
		const s = String(media?.filename || media?.url || '');
		return s.includes('youtube.com') || s.includes('youtu.be');
	}
	function isVideo(media) {
		const t = media?.type || '';
		const s = String(media?.filename || media?.url || '');
		return t.startsWith('video') || /\.(mp4|webm|mov|ogg)$/i.test(s);
	}
	function isPdf(media) {
		return (media?.type || '') === 'application/pdf';
	}
	function isImage(media) {
		const t = media?.type || '';
		const s = String(media?.filename || media?.url || '');
		return t.startsWith('image') || /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(s);
	}
</script>

<section class="m-auto mt-10 mb-10 w-full">
	{#if medias.length > 0}
		<div class="flex items-center justify-between gap-4">
			<Gallery>
				{#each medias as media, i}
					<div class="media-item">
						<div class="h-full pb-2">
							{#if isPdf(media)}
								<PdfPreview {media} />
							{:else if isYoutube(media) || isVideo(media)}
								<VideoPreview {media} />
							{:else}
								<a
									href={media.url}
									target="_blank"
									class="flex h-[400px] items-center justify-center"
								>
									<img src={media.url} alt={media.title} class="block max-h-[400px] w-auto" />
								</a>
							{/if}
						</div>
						<div class="flex justify-between">
							<a href={media.url ?? media.filename}>{media.title}</a>
						</div>
					</div>
				{/each}
			</Gallery>
		</div>
	{/if}
</section>
