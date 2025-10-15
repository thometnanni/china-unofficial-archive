<script>
	import { m } from '$lib/paraglide/messages';
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

<section class="sticky top-0 z-10 w-svw border-b bg-white text-black">
	<div class="mx-auto flex items-center justify-between px-1">
		<div class="mr-2 text-2xl text-black select-none" aria-hidden="true">
			<!-- <svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				vector-effect="non-scaling-stroke"
				shape-rendering="geometricPrecision"
			>
				<path d="M4 6h16M4 12h16M4 18h16" />
			</svg> -->
			<p class="cursor-pointer uppercase" on:click={() => (openMenu = !openMenu)}>
				{m.menu()}
			</p>
			{#if openMenu}
				<div
					use:clickOutside
					role="menu"
					class="absolute left-0 flex flex-col items-start text-2xl"
				>
					<a
						href={localizeHref('/')}
						class="cursor-pointer bg-black px-4 py-2 text-white transition hover:bg-white hover:text-black focus:bg-white"
					>
						Home
					</a>
					<a
						href={localizeHref('/archive/')}
						class="cursor-pointer bg-black px-4 py-2 text-white transition hover:bg-white hover:text-black focus:bg-white"
					>
						Explore
					</a>
					<a
						href={localizeHref('/about/')}
						class="cursor-pointer bg-black px-4 py-2 text-white transition hover:bg-white hover:text-black focus:bg-white"
					>
						About
					</a>

					<a
						href={localizeHref('/contact/')}
						class="cursor-pointer bg-black px-4 py-2 text-white transition hover:bg-white hover:text-black focus:bg-white"
					>
						Contacts
					</a>
				</div>
			{/if}
		</div>

		<div
			class=" relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,black_24px,black_calc(100%_-_24px),transparent_100%)] text-center [-webkit-mask-image:linear-gradient(90deg,transparent_0,black_24px,black_calc(100%_-_24px),transparent_100%)] hover:bg-brand-gray-50"
		>
			<a href="/">
				<div class="inline-flex">
					<div class="items-center gap-1 px-1 text-2xl">
						<span class="en whitespace-nowrap">{m.title(null, { locale: 'en' })}</span>
						<span>–</span>
						<span class="en whitespace-nowrap">{m.title(null, { locale: 'zh' })}</span>
						<span>–</span>
						<span class="zh whitespace-nowrap">{m.title(null, { locale: 'zh-py' })}</span>
					</div>
				</div></a
			>
		</div>

		<div class="ml-2 hidden items-center gap-2 text-2xl sm:flex">
			<span aria-hidden="true">
				<svg
					width="18"
					height="18"
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
			<span aria-hidden="true">
				<button
					type="button"
					class="cursor-pointer rounded p-1 hover:bg-gray-100 focus:ring-2 focus:ring-black/30 focus:outline-none"
					aria-haspopup="lang"
					aria-expanded={openLang}
					on:click={() => (openLang = !openLang)}
					aria-label="Change language"
				>
					<svg
						width="18"
						height="18"
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
						class="absolute right-0 flex flex-col items-end text-2xl"
					>
						<button
							role="menuitem"
							class="cursor-pointer bg-black px-4 py-2 text-white transition hover:bg-white hover:text-black focus:bg-white"
							on:click={() => {
								setLocale('zh');
								openLang = false;
							}}
						>
							{m.lang(null, { locale: 'zh' })}
						</button>

						<button
							role="langmenu"
							class="relative cursor-pointer bg-black px-4 py-2 text-white transition hover:bg-gray-800 focus:bg-gray-800"
							on:click={() => {
								setLocale('en');
								openLang = false;
							}}
						>
							{m.lang(null, { locale: 'en' })}
						</button>
					</div>
				{/if}
			</span>
		</div>
	</div>
</section>

<style>
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
