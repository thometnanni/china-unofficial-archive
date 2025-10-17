<script>
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { m } from '$lib/paraglide/messages';

	let i = 0,
		paused = false,
		timer,
		prefersReduced = false;

	const names = [
		m.title(null, { locale: 'zh' }),
		m.title(null, { locale: 'zh_py' }),
		m.title(null, { locale: 'en' })
	];

	const intervalMs = 4000;
	const durationMs = 1200;

	const step = () => (i = (i + 1) % names.length);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReduced = mq.matches;
		const listener = (e) => (prefersReduced = e.matches);
		mq.addEventListener?.('change', listener);

		const tick = () => {
			if (!paused) step();
			timer = setTimeout(tick, intervalMs);
		};
		timer = setTimeout(tick, intervalMs);

		return () => {
			clearTimeout(timer);
			mq.removeEventListener?.('change', listener);
		};
	});

	onDestroy(() => clearTimeout(timer));
</script>

<div
	class="relative inline-grid w-full place-items-center pt-1 pb-1 leading-tight font-medium select-none"
	on:mouseenter={() => (paused = true)}
	on:mouseleave={() => (paused = false)}
	aria-live="polite"
>
	{#key i}
		<span
			class="absolute inset-0 flex items-center justify-center text-center whitespace-nowrap"
			in:fade={{ duration: prefersReduced ? 0 : durationMs }}
			out:fade={{ duration: prefersReduced ? 0 : durationMs }}
		>
			{names[i]}
		</span>
	{/key}
</div>
