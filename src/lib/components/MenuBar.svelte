<script>
	import { m } from '$lib/paraglide/messages';
	import Logo from '$lib/components/Logo.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { setLocale, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';

	let openMenu = $state(false);
	let isCollapsed = $state(false);
	let showSpace = $derived($page.route.id !== '/');
	let showBg = $derived($page.params.slug !== 'about' && $page.params.slug !== 'resources');
	let lang = $derived(getLocale());

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
			if (isCollapsed) openMenu = false;
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

{#if showSpace}
	<div
		class="pointer-events-none h-[250px]"
		style="--color-card-primary: var(--color-brand-purple);"
	>
		{#if showBg}
			<ImageFilter
				src="https://minjian-danganguan.org/files/original/a033ef9956aaa4a9bcace1c6de9e8dde1611d87d.jpg"
				fit="cover"
			/>
		{/if}
	</div>
{/if}

<section class="fixed top-0 left-0 z-[200] text-black">
	<div class="w-[200px] p-1">
		<div class="mb-1 border-1 bg-white">
			<a href="/"><Logo textColor="#000" showSubtitle={true} /></a>
		</div>

		{#if !isCollapsed}
			<div class="custom-outline mb-1 text-xl">
				<a data-sveltekit-reload href={localizeHref('/archive?view=all')}>
					<TextOutlined>{m.nav_explore()}</TextOutlined>
				</a>
			</div>
			<div class="custom-outline mb-1 text-xl">
				<a data-sveltekit-reload href={localizeHref('/archive?view=creator')}>
					<TextOutlined>{m.nav_creators()}</TextOutlined>
				</a>
			</div>
			<div class="custom-outline mb-1 text-xl">
				<a data-sveltekit-reload href="https://chinaunofficialarchives.substack.com/">
					<TextOutlined>{m.nav_newsletter()}</TextOutlined>
				</a>
			</div>
			<!-- <div class="custom-outline mb-1 text-xl">
				<a data-sveltekit-reload href={localizeHref('/exhibits/')}>
					<TextOutlined>{m.nav_exhibits ? m.nav_exhibits() : 'exhibits'}</TextOutlined>
				</a>
			</div> -->
		{:else}
			<div class="relative">
				<div class="custom-outline mb-1 text-xl">
					<button onclick={() => (openMenu = !openMenu)}>
						<TextOutlined>⋯</TextOutlined>
					</button>
				</div>

				{#if openMenu}
					<div use:clickOutside role="menu" class="menuPanel text-xl">
						<a class="custom-outline" href={localizeHref('/archive?view=all')}>
							<TextOutlined>{m.nav_explore()}</TextOutlined>
						</a>
						<a class="custom-outline" href={localizeHref('/archive?view=creator')}>
							<TextOutlined>{m.nav_creators()}</TextOutlined>
						</a>
						<a class="custom-outline" href={localizeHref('/newsletters/')}>
							<TextOutlined>{m.nav_newsletter()}</TextOutlined>
						</a>
						<!-- <a class="custom-outline" href={localizeHref('/exhibits/')}>
							<TextOutlined>{m.nav_exhibits ? m.nav_exhibits() : 'exhibits'}</TextOutlined>
						</a> -->
						<a class="custom-outline" href={localizeHref('/about/')}>
							<TextOutlined>{m.nav_about()}</TextOutlined>
						</a>
						<a class="custom-outline" href={localizeHref('/resources/')}>
							<TextOutlined>{m.nav_resources()}</TextOutlined>
						</a>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>

<section class="fixed top-2 right-2 z-[210] text-xl text-black">
	<div class="flex items-center gap-2">
		<button
			class="custom-outline {lang === 'zh' ? 'is-active' : ''}"
			onclick={() => setLocale('zh')}
		>
			<TextOutlined>{m.lang(null, { locale: 'zh' })}</TextOutlined>
		</button>
		<button
			class="custom-outline {lang === 'en' ? 'is-active' : ''}"
			onclick={() => setLocale('en')}
		>
			<TextOutlined>{m.lang(null, { locale: 'en' })}</TextOutlined>
		</button>
	</div>
</section>

<style>
	.custom-outline {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		--lh-tight: 1.28;
		--color-outlined-border: var(--color-black);
		--color-outlined-bg: var(--color-white);

		&.is-active {
			--color-outlined-bg: var(--color-black);
			--color-outlined-text: var(--color-white);
		}

		&:hover {
			--color-outlined-bg: var(--color-black);
			--color-outlined-text: var(--color-white);
		}

		button {
			margin-top: 0;
			cursor: pointer;
		}
	}

	.menuPanel {
		position: absolute;
		top: 100%;
		left: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		z-index: 220;
	}
</style>
