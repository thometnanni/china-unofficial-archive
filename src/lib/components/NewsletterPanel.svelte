<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { setupResize } from '$lib/resize';
	import { browser } from '$app/environment';
	import { resolve } from '$app/paths';
	import { m } from '$lib/paraglide/messages';
	import TextOutlined from './TextOutlined.svelte';

	let { items = [] } = $props();
	let containerRef;
	let isReady = $state(false);

	function updateLayout() {
		if (!browser) return;
		if (!containerRef || !items?.length) return;

		const lis = Array.from(containerRef.querySelectorAll('li'));
		if (!lis.length) return;

		const width = window.innerWidth || 0;

		if (width < 768) {
			lis.forEach((li, i) => {
				li.style.display = i < 3 ? '' : 'none';
			});
			isReady = true;
			return;
		}

		lis.forEach((li) => {
			li.style.display = '';
		});

		let maxHeight = containerRef.clientHeight;
		if (!maxHeight) {
			isReady = true;
			return;
		}

		const all = containerRef.querySelector('.see-all');
		maxHeight -=
			all.getBoundingClientRect().height +
			parseFloat(getComputedStyle(all).marginTop) +
			parseFloat(getComputedStyle(all).marginBottom);

		let total = 0;

		for (let i = 0; i < lis.length; i += 1) {
			const li = lis[i];
			const rect = li.getBoundingClientRect();
			const style = getComputedStyle(li);
			const h =
				rect.height + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);

			if (total + h > maxHeight) {
				li.style.display = 'none';
			} else {
				li.style.display = '';
				total += h;
			}
		}

		isReady = true;
	}

	onMount(() => {
		if (!browser) return;
		setupResize(containerRef, updateLayout);
	});
</script>

<div class="flex h-full flex-col text-black" style:visibility={isReady ? 'visible' : 'hidden'}>
	<div class="relative mt-4 min-h-0 flex-1" bind:this={containerRef}>
		<ul>
			{#each items as item (item.id)}
				<li class="mb-4">
					<a
						href={resolve(localizeHref(`/archive/${item.id}`))}
						class="flex w-full items-start gap-2 py-1 hover:text-brand"
					>
						<div class="text-base">
							<div class="text-sm opacity-70">
								{new Date(item.published).toLocaleDateString()}
							</div>
							<div class="text-base leading-snug">
								{item.title}
							</div>
						</div>
					</a>
				</li>
			{/each}

			<div class="see-all mb-4 flex justify-end">
				<a href={resolve(localizeHref('/archive?objectType=4185'))}>
					<TextOutlined class="newsletter">{m.see_all_newsletters()}</TextOutlined></a
				>
			</div>
		</ul>
	</div>
</div>

<style>
	.see-all a {
		--color-card-primary: var(--color-type-object-newsletter);
	}
	.see-all a:hover {
		--color-outlined-border: var(--color-white);
		--color-outlined-bg: var(--color-card-primary);
		--color-outlined-text: var(--color-white);
	}
</style>
