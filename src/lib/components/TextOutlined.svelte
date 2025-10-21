<script>
	let { children, class: className = '', as = 'div' } = $props();
</script>

<svelte:element this={as} class={`text-outlined grid ${className}`}>
	<div class="col-[1/2] row-[1/2] leading-[var(--lh-tight)] text-balance" aria-hidden="true">
		<span class="border box-decoration-clone px-1">
			{@render children?.()}
		</span>
	</div>
	<div class="col-[1/2] row-[1/2] leading-[var(--lh-tight)] text-balance">
		<span class="border-r border-l box-decoration-clone px-1">
			{@render children?.()}
		</span>
	</div>
</svelte:element>

<style>
	.text-outlined > div > span {
		border-color: var(--color-outlined-border, var(--color-card-primary));
		color: var(--color-outlined-text, black);
		background-color: var(--color-outlined-bg, white);
	}
</style>
