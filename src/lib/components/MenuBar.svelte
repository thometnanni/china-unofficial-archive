<script>
	import { m } from '$lib/paraglide/messages';
	import { setLocale } from '$lib/paraglide/runtime';
	const repeats = 5;
	let open = false;

	function clickOutside(node) {
		const handle = (e) => {
			if (!node.contains(e.target)) open = false;
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
		<div class="mr-2 text-lg leading-none text-black select-none" aria-hidden="true">
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
			<button class="cursor-pointer uppercase">
				{m.menu()}
			</button>
		</div>

		<div
			class=" relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,black_24px,black_calc(100%_-_24px),transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0,black_24px,black_calc(100%_-_24px),transparent_100%)] hover:bg-brand-yellow"
		>
			<a href="/">
				<div
					class="inline-flex [animation:marquee_100s_linear_infinite] will-change-[transform] hover:[animation-play-state:paused]"
				>
					{#each Array(2) as _}
						<div class="inline-flex items-center gap-1 px-1 text-xl">
							{#each Array(repeats) as __}
								<span class="zh whitespace-nowrap">{m.title(null, { locale: 'zh' })}</span>
								<span>–</span>
								<span class="en whitespace-nowrap">{m.title(null, { locale: 'zh-py' })}</span>
								<span>–</span>
								<span class="en whitespace-nowrap">{m.title(null, { locale: 'en' })}</span>
								<span>–</span>
							{/each}
						</div>
					{/each}
				</div>
			</a>
		</div>

		<div class="ml-2 hidden items-center gap-2 leading-none sm:flex">
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
					aria-haspopup="menu"
					aria-expanded={open}
					on:click={() => (open = !open)}
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

				{#if open}
					<div
						use:clickOutside
						role="menu"
						class="absolute right-0 flex flex-col items-end text-2xl"
					>
						<button
							role="menuitem"
							class="cursor-pointer bg-black px-4 py-2 text-white transition hover:bg-white hover:text-black focus:bg-white"
							on:click={() => {
								setLocale('zh');
								open = false;
							}}
						>
							{m.lang(null, { locale: 'zh' })}
						</button>

						<button
							role="menuitem"
							class="relative cursor-pointer bg-black px-4 py-2 text-white transition hover:bg-gray-800 focus:bg-gray-800"
							on:click={() => {
								setLocale('en');
								open = false;
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
