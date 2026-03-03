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

<button type="button" class="cursor-pointer" onclick={sharePage}>
	<svg
		id="icon"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		style="display: inline; width: .875em; height: .875em; vertical-align: -0.125em;"
		><path
			fill="currentColor"
			d="M23,20a5,5,0,0,0-3.89,1.89L11.8,17.32a4.46,4.46,0,0,0,0-2.64l7.31-4.57A5,5,0,1,0,18,7a4.79,4.79,0,0,0,.2,1.32l-7.31,4.57a5,5,0,1,0,0,6.22l7.31,4.57A4.79,4.79,0,0,0,18,25a5,5,0,1,0,5-5ZM23,4a3,3,0,1,1-3,3A3,3,0,0,1,23,4ZM7,19a3,3,0,1,1,3-3A3,3,0,0,1,7,19Zm16,9a3,3,0,1,1,3-3A3,3,0,0,1,23,28Z"
		/><rect
			id="_Transparent_Rectangle_"
			fill="none"
			width="32"
			height="32"
			transform="translate(0 32) rotate(-90)"
		/></svg
	>
	{copied ? m.link_copied() : m.share()}
</button>
