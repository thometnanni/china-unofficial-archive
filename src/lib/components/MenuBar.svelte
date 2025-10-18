<script>
	import { m } from '$lib/paraglide/messages';
	import Logo from '$lib/components/Logo.svelte';
	import TextOutlined from '$lib/components/TextOutlined.svelte';
	import RotatingNames from '$lib/components/RotatingNames.svelte';
	import { setLocale, localizeHref } from '$lib/paraglide/runtime';
	const repeats = 5;
	let openLang = false;
	let openMenu = false;

	function clickOutside(node, param) {
		const handle = (e) => {
			if (!node.contains(e.target)) openLang = false;
			if (!node.contains(e.target)) openMenu = false;
		};
		document.addEventListener('mousedown', handle);
		return {
			destroy() {
				document.removeEventListener('mousedown', handle);
			}
		};
	}
</script>

<section class="sticky top-0 z-100 w-svw border-b bg-white text-black">
	<div class="relative flex items-start justify-between px-1">
		<div class="z-200 mr-2 bg-white text-xl text-black select-none" aria-hidden="true">
			<p class="cursor-pointer uppercase" on:click={() => (openMenu = !openMenu)}>
				{m.menu()}
			</p>
			{#if openMenu}
				<div
					use:clickOutside
					role="menu"
					class="absolute left-0 flex flex-col items-start text-2xl"
				>
					<a href={localizeHref('/')} class="">
						<TextOutlined>
							{m.nav_home()}
						</TextOutlined>
					</a>
					<a href={localizeHref('/archive/')} class="">
						<TextOutlined>
							{m.nav_explore()}
						</TextOutlined>
					</a>

					<a href={localizeHref('/about/')} class="">
						<TextOutlined>
							{m.nav_about()}
						</TextOutlined>
					</a>

					<a href={localizeHref('/resources/')} class="">
						<TextOutlined>
							{m.nav_resources()}
						</TextOutlined>
					</a>
				</div>
			{/if}
		</div>

		<div class="pointer-events-none absolute inset-x-0 min-w-0 flex-1 overflow-hidden text-center">
			<div class="pointer-events-auto inline-flex items-center">
				<a href="/" class="relative z-100 inline-block">
					<div
						class="custom-border flex w-[260px] max-w-[260px] items-center gap-1 bg-white px-1
		       text-xl sm:w-[260px] sm:max-w-[260px]"
					>
						<Logo textColor="#000" showSubtitle={false} />
						<!-- <RotatingNames /> -->
					</div>
				</a>
			</div>
		</div>

		<div class="z-200 ml-2 flex items-center gap-2 bg-white text-xl">
			<span aria-hidden="true">
				<svg
					width="1rem"
					height="1rem"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					vector-effect="non-scaling-stroke"
					shape-rendering="geometricPrecision"
				>
					<path d="M7 3h10a2 2 0 0 1 2 2v16l-7-4-7 4V5a2 2 0 0 1 2-2Z" />
				</svg>
			</span>

			<span>
				<button
					type="button"
					class="cursor-pointer rounded p-1 hover:bg-gray-100 focus:ring-2 focus:ring-black/30 focus:outline-none"
					aria-haspopup="lang"
					aria-expanded={openLang}
					on:click={() => (openLang = !openLang)}
					aria-label="Change language"
				>
					<svg
						width="1rem"
						height="1rem"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						vector-effect="non-scaling-stroke"
						shape-rendering="geometricPrecision"
					>
						<circle cx="12" cy="12" r="9" />
						<path d="M3 12h18" />
						<path d="M12 3c3 3.5 3 14 0 18" />
						<path d="M12 3c-3 3.5-3 14 0 18" />
					</svg>
				</button>

				{#if openLang}
					<div
						use:clickOutside
						role="langmenu"
						class="absolute right-0 z-100 flex flex-col items-end text-xl"
					>
						<button
							role="menuitem"
							class="cursor-pointer"
							on:click={() => {
								setLocale('zh');
								openLang = false;
							}}
						>
							<TextOutlined>
								{m.lang(null, { locale: 'zh' })}
							</TextOutlined>
						</button>
						<button
							role="menuitem"
							class="cursor-pointer"
							on:click={() => {
								setLocale('en');
								openLang = false;
							}}
						>
							<TextOutlined>
								{m.lang(null, { locale: 'en' })}
							</TextOutlined>
						</button>
					</div>
				{/if}
			</span>
		</div>
	</div>
</section>

<style>
	.custom-border::before,
	.custom-border::after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 50%;
		height: 47%;
		border-bottom: 1px solid black;
		pointer-events: none;
	}
	.custom-border::before {
		left: 0;
		border-left: 1px solid black;
	}
	.custom-border::after {
		right: 0;
		border-right: 1px solid black;
	}

	:global {
		@keyframes marquee {
			from {
				transform: translateX(0);
			}
			to {
				transform: translateX(-50%);
			}
		}
	}
</style>
