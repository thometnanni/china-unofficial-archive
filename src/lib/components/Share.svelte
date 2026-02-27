<script>
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';

	let copied = $state(false);

	async function sharePage() {
		if (navigator.share != null) {
			const shareData = {
				title: page.data.seo?.title ?? m.title(),
				text: `${page.data.seo?.title ?? m.title()} – ${page.data.seo?.description ?? m.slogan()}`,
				url: page.url.href
			};
			await navigator.share(shareData);
		} else {
			await navigator.clipboard.writeText(page.url.href);
			copied = true;
			setTimeout(() => (copied = false), 3000);
		}
	}
</script>

<button type="button" class="cursor-pointer" onclick={sharePage}
	>{copied ? m.link_copied() : m.share()}</button
>
