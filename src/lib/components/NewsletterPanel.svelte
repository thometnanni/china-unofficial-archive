<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { setupResize } from '$lib/resize';
	import { browser } from '$app/environment';

	let { items = [] } = $props();
	let containerRef;
	let resizeCleanup;
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

		const maxHeight = containerRef.clientHeight;
		if (!maxHeight) {
			isReady = true;
			return;
		}

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
			{#each items as n}
				<li class="mb-4">
					<a
						href={localizeHref(`/archive/${n.id}`)}
						class="flex w-full items-start gap-2 py-1 hover:text-brand"
					>
						<div class="text-base">
							<div class="text-sm opacity-70">
								{new Date(n.published).toLocaleDateString()}
							</div>
							<div class="text-base leading-snug">
								{n.title}
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
