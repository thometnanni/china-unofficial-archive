<script>
	import { m } from '#lib/paraglide/messages.js';
	import Logo from '#lib/components/Logo.svelte';
	import { setLocale, localizeHref, getLocale } from '#lib/paraglide/runtime.js';
	import { page } from '$app/state';

	let showMenu = $state(false);

	let lang = $derived(getLocale());

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function closeMenu() {
		showMenu = false;
	}
</script>

<nav class="absolute z-50 flex w-full justify-between p-2 text-xl">
	<section class="flex items-start gap-2">
		<div class="w-37.5 max-w-[calc(100vw-160px)] border border-brand bg-white">
			<a href="/"><Logo /></a>
		</div>

		<a class="button hidden sm:block" href={localizeHref('/archive')}>
			{m.nav_explore()}
		</a>

		<a class="button hidden sm:block" href={localizeHref('/archive?view=creator')}>
			{m.nav_creators()}
		</a>

		<a
			target="_blank"
			class="button hidden sm:block"
			href="https://chinaunofficialarchives.substack.com/"
		>
			{m.nav_newsletter()}
		</a>
	</section>
	<section class="flex flex-col items-end gap-2">
		<div class="flex items-center gap-2">
			<button
				class="custom-outline {lang === 'zh-cn' ? 'is-active' : ''}"
				onclick={() => setLocale('zh-cn')}
			>
				<!-- {m.lang(null, { locale: 'zh-cn' })} -->
				中文
			</button>
			<!-- <button
				class="custom-outline {lang === 'zh-hk' ? 'is-active' : ''}"
				onclick={() => setLocale('zh-hk')}
			>
				{m.lang(null, { locale: 'zh-hk' })}
			</button> -->
			<button
				class="custom-outline {lang === 'en' ? 'is-active' : ''}"
				onclick={() => setLocale('en')}
			>
				{m.lang(null, { locale: 'en' })}
			</button>
			<button
				aria-label="menu"
				class="p-1 sm:hidden"
				class:hidden={page.route.id === '/'}
				onclick={toggleMenu}
			>
				<svg width="20" height="20">
					{#if showMenu}
						<line x1="4" x2="16" y1="4" y2="16"></line>
						<line x1="4" x2="16" y1="16" y2="4"></line>
					{:else}
						<line x1="2" x2="18" y1="5" y2="5"></line>
						<line x1="2" x2="18" y1="10" y2="10"></line>
						<line x1="2" x2="18" y1="15" y2="15"></line>
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
		{/if}

		{#if showMenu || page.route.id === '/'}
			<a class="button sm:hidden" href={localizeHref('/archive')} onclick={closeMenu}
				>{m.nav_explore()}</a
			>

			<a class="button sm:hidden" href={localizeHref('/archive?view=creator')} onclick={closeMenu}>
				{m.nav_creators()}
			</a>

			<a
				target="_blank"
				class="button sm:hidden"
				href="https://chinaunofficialarchives.substack.com/"
			>
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
