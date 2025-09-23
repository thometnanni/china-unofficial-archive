<script>
	import { m } from '$lib/paraglide/messages';
	const repeats = 5;
</script>

<section class="sticky top-0 z-10 w-svw border-t border-b bg-white text-black">
	<div class="mx-auto flex items-center justify-between px-1">
		<div class="mr-2 text-lg leading-none text-black select-none" aria-hidden="true">
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
				<path d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</div>

		<div
			class="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,black_24px,black_calc(100%_-_24px),transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0,black_24px,black_calc(100%_-_24px),transparent_100%)]"
		>
			<div
				class="inline-flex [animation:marquee_100s_linear_infinite] will-change-[transform] hover:[animation-play-state:paused]"
			>
				{#each Array(2) as _}
					<div class="inline-flex items-center gap-1 px-1 text-xs">
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
