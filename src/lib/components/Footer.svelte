<script>
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Share from './Share.svelte';
	// import Logo from '$lib/components/Logo.svelte';
</script>

<article class="footer mt-20 flex flex-col bg-black p-2 text-white">
	<div class="footer-filter" aria-hidden="true">
		<ImageFilter fit="cover" objectPosition="center" fade />
	</div>
	<ul class="flex flex-wrap gap-4">
		<li><a class="text-2xl" href={localizeHref('/about/')}>{m.nav_about()}</a></li>
		<li><a class="text-2xl" href={localizeHref('/resources/')}>{m.nav_resources()}</a></li>
		<li class="text-2xl"><Share /></li>
	</ul>
	<div class="max-w-[800px] text-xl pt-4">
		<p>© {m.title()}</p>
		<p class="mt-2 text-xs">
			{m.claim()}
		</p>

		{#if browser}
			{@const address = `${atob('aW5mbw==')}@${atob('bWluamlhbi1kYW5nYW5ndWFuLm9yZw==')}`}
			<p class="mt-4 text-base">
				{m.nav_contact()}:
				<a href="mailto:{address}" class="underline">
					{address}
				</a>
			</p>
		{/if}

		<p class="text-base text-neutral-400">
			Site by <a href="https://krisenstab.net/" target="_blank" class="underline">krisenstab</a>
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
