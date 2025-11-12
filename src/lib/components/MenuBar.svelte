<script>
	import { m } from '$lib/paraglide/messages';
	import Logo from '$lib/components/Logo.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import ImageFilter from '$lib/components/ImageFilter.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { setLocale, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/stores';

	let showMenu = $state(false);

	let openMenu = $state(false);
	let isCollapsed = $state(false);
	let showSpace = $derived($page.route.id !== '/');
	let showBg = $derived($page.route.id === '/archive/[[id]]');
	let lang = $derived(getLocale());

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function closeMenu() {
		showMenu = false;
	}

	function clickOutside(node) {
		const handle = (e) => {
			e.stopPropagation();
			if (!node.contains(e.target)) showMenu = false;
		};
		document.addEventListener('mousedown', handle);
		return {
			destroy() {
				document.removeEventListener('mousedown', handle);
			}
		};
	}

	const defaultHero =
		'https://minjian-danganguan.org/files/original/a033ef9956aaa4a9bcace1c6de9e8dde1611d87d.jpg';

	function pickHeroFromData(p) {
		if (p.route.id !== '/archive/[[id]]') return null;
		const d = p.data?.item;
		if (!d) return null;
		const check = (i) => i && /\.(jpe?g|png)$/i.test(i);
		const tryUrl =
			d?.media?.find((m) => check(m?.url))?.url ||
			(Array.isArray(d?.items) ? d.items[0]?.media?.find((m) => check(m?.url))?.url : null) ||
			(check(d?.thumbnail) ? d.thumbnail : null);
		return tryUrl || null;
	}

	let heroSrc = $derived(pickHeroFromData($page) || defaultHero);
</script>

<nav class="fixed z-50 flex w-full justify-between p-2 text-xl">
	<section class="flex items-start gap-2">
		<div class="w-[150px] max-w-[calc(100vw_-160px)] border-1 border-brand bg-white">
			<a href="/"><Logo height="60" /></a>
		</div>

		<a class="button hidden sm:block" href={localizeHref('/archive?view=all')}>
			{m.nav_explore()}
		</a>

		<a class="button hidden sm:block" href={localizeHref('/archive?view=creator')}>
			{m.nav_creators()}
		</a>

		<a class="button hidden sm:block" href="https://chinaunofficialarchives.substack.com/">
			{m.nav_newsletter()}
		</a>
	</section>
	<section class="flex flex-col items-end gap-2">
		<div class="flex items-center gap-2">
			<button
				class="custom-outline {lang === 'zh' ? 'is-active' : ''}"
				onclick={() => setLocale('zh')}
			>
				{m.lang(null, { locale: 'zh' })}
			</button>
			<button
				class="custom-outline {lang === 'en' ? 'is-active' : ''}"
				onclick={() => setLocale('en')}
			>
				{m.lang(null, { locale: 'en' })}
			</button>
			<button aria-label="menu" class="p-1 sm:hidden" onclick={toggleMenu}>
				<svg width="20" height="20">
					{#if showMenu}
						<line x1="4" x2="16" y1="4" y2="16" />
						<line x1="4" x2="16" y1="16" y2="4" />
					{:else}
						<line x1="2" x2="18" y1="5" y2="5" />
						<line x1="2" x2="18" y1="10" y2="10" />
						<line x1="2" x2="18" y1="15" y2="15" />
					{/if}
				</svg>
			</button>
		</div>

		{#if showMenu}
			<div
				class="fixed top-0 left-0 -z-1 h-full w-full sm:hidden"
				onclick={closeMenu}
				aria-hidden="true"
			></div>

			<a class="button sm:hidden" href={localizeHref('/archive?view=all')} onclick={closeMenu}>
				{m.nav_explore()}
			</a>

			<a class="button sm:hidden" href={localizeHref('/archive?view=creator')} onclick={closeMenu}>
				{m.nav_creators()}
			</a>

			<a class="button sm:hidden" href="https://chinaunofficialarchives.substack.com/">
				{m.nav_newsletter()}
			</a>
		{/if}
	</section>
</nav>

<style>
	@reference "../../app.css";
	.button,
	button {
		@apply cursor-pointer border border-brand bg-white px-1;

		&.is-active,
		&:hover {
			@apply border-white bg-brand text-white;
		}

		&.is-active {
			@apply cursor-default;
		}

		svg {
			line {
				stroke: currentColor;
			}
		}
	}
</style>
