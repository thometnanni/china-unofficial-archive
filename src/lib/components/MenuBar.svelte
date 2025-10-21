<script>
	import { m } from '$lib/paraglide/messages';
	import Logo from '$lib/components/Logo.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { setLocale, localizeHref } from '$lib/paraglide/runtime';

	let openMenu = false;
	let isCollapsed = false;

	function clickOutside(node) {
		const handle = (e) => {
			if (!node.contains(e.target)) openMenu = false;
		};
		document.addEventListener('mousedown', handle);
		return {
			destroy() {
				document.removeEventListener('mousedown', handle);
			}
		};
	}

	function bindScroll() {
		const update = () => {
			isCollapsed = window.scrollY > 20;
			if (isCollapsed) {
				openMenu = false;
				isCollapsed = true;
			}
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	}

	let unbind = null;

	onMount(() => {
		unbind = bindScroll();
	});
	onDestroy(() => {
		if (unbind) unbind();
	});
</script>

<div class="h-[200px]"></div>
<section class="fixed top-0 left-0 z-[200] text-black">
	<div class="w-[200px] p-1">
		<div class="border-1 bg-white">
			<a href="/"><Logo textColor="#000" showSubtitle={true} /></a>
		</div>

		{#if !isCollapsed || openMenu}
			<div class="text-2xl">
				<a href={localizeHref('/archive/')}>
					<TextOutlined>{m.nav_explore()}</TextOutlined>
				</a>
			</div>

			<div class="text-2xl">
				<a href={localizeHref('/creators/')}>
					<TextOutlined>{m.nav_creators()}</TextOutlined>
				</a>
			</div>
		{/if}

		<div>
			<button class="cursor-pointer text-2xl" on:click={() => (openMenu = !openMenu)}>
				<TextOutlined>⋯</TextOutlined>
			</button>
			{#if openMenu}
				<div use:clickOutside role="menu" class="absolute flex flex-col text-2xl">
					<!-- <a href={localizeHref('/')}><TextOutlined>{m.nav_home()}</TextOutlined></a> -->
					<a href={localizeHref('/about/')}><TextOutlined>{m.nav_about()}</TextOutlined></a>
					<a href={localizeHref('/resources/')}><TextOutlined>{m.nav_resources()}</TextOutlined></a>
				</div>
			{/if}
		</div>
	</div>
</section>

<section class="fixed top-2 right-2 z-[210] text-2xl text-black">
	<div class="flex items-center gap-2">
		<button class="cursor-pointer" on:click={() => setLocale('zh')}>
			<TextOutlined>{m.lang(null, { locale: 'zh' })}</TextOutlined>
		</button>
		<button class="cursor-pointer" on:click={() => setLocale('en')}>
			<TextOutlined>{m.lang(null, { locale: 'en' })}</TextOutlined>
		</button>
	</div>
</section>

<style>
	section {
		--color-card-primary: var(--color-brand-black);
	}
</style>
