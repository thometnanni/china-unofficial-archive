<script>
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	// import Logo from '$lib/components/Logo.svelte';
</script>

<article class="footer mt-20 flex flex-col bg-black text-white">
	<div class="footer-filter" aria-hidden="true">
		<ImageFilter fit="cover" objectPosition="center" fade />
	</div>
	<ul class="flex flex-wrap gap-4 p-1">
		<li><a class="text-2xl" href={localizeHref('/about/')}>{m.nav_about()}</a></li>
		<li><a class="text-2xl" href={localizeHref('/resources/')}>{m.nav_resources()}</a></li>
	</ul>
	<div class="max-w-[800px] p-2 text-xl">
		<p class="mb-4 text-base">
			{m.nav_contact ? m.nav_contact() : 'Contact'}:
			<a href="mailto:minjiandanganguan@gmail.com" class="underline">minjiandanganguan@gmail.com</a>
		</p>
		<p>© {m.title()}</p>
		<p class="mt-1 text-xs">
			{m.claim()}
		</p>
	</div>

	<div class="mt-10 mb-5 max-w-[200px]">
		<!-- <Logo textColor={'#fff'} /> -->
	</div>
</article>

<style>
	.footer {
		position: relative;
		overflow: visible;
	}

	.footer-filter {
		--color-card-primary: #000;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 67%;
		height: 160px;
		pointer-events: none;
		transform: scaleY(-1);
		z-index: -1;
	}

	.footer-filter :global(.waves) {
		display: none;
	}
</style>
