<script>
	let { children } = $props();

	let outer, inner;
	let mousemoveEnabled = true;
	let programmaticScroll = false;

	let margin = 20;

	function onMousemove(e) {
		// console.log('mousemove');
		if (!mousemoveEnabled) return;
		const outerElWidth = outer.getBoundingClientRect().width;
		const innerElWidth = inner.getBoundingClientRect().width;
		if (innerElWidth <= outerElWidth) return;

		const x = e.clientX;
		const fraction = (x - margin) / (outerElWidth - margin * 2);
		const diff = innerElWidth - outerElWidth;

		programmaticScroll = true;
		outer.scrollTo({ left: diff * fraction, behavior: 'instant' });
		requestAnimationFrame(() => (programmaticScroll = false));
	}

	function onMouseover() {
		mousemoveEnabled = true;
	}

	function onScroll() {
		if (!programmaticScroll) mousemoveEnabled = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={outer}
	class="outer w-full overflow-x-auto scroll-smooth"
	onmousemovecapture={onMousemove}
	onmouseenter={onMouseover}
	onscroll={onScroll}
>
	<div
		bind:this={inner}
		class="inner sc m-auto mt-0 mb-0 flex w-max flex-nowrap items-center justify-center gap-4 px-4"
	>
		{@render children?.()}
	</div>
</div>

<style>
	.outer {
		scrollbar-width: none;
	}
</style>
