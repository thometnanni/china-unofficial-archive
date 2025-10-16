<script>
	let { children, class: className = '', as = 'div' } = $props();
</script>

<svelte:element this={as} class={`grid ${className}`}>
	<div
		class="col-[1/2] row-[1/2] leading-[var(--lh-tight)] text-balance text-black"
		aria-hidden="true"
	>
		<span class="border border-card-primary bg-white box-decoration-clone px-1">
			{@render children?.()}
		</span>
	</div>
	<div class="col-[1/2] row-[1/2] leading-[var(--lh-tight)] text-balance text-black">
		<span class="border-r border-l border-card-primary bg-white box-decoration-clone px-1">
			{@render children?.()}
		</span>
	</div>
</svelte:element>
