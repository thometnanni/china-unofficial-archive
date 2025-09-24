<script>
	let { items = [] } = $props();
</script>

<div class="relative inline-block pt-8 text-black">
	<h3 class="absolute top-0 right-0 z-10 bg-brand-yellow px-2 py-1 text-xl">Newsletter</h3>

	<section class="w-fit bg-brand-yellow">
		<ul class="space-y-1">
			{#each items.slice(0, 10) as n}
				<li>
					<a
						href={n.url}
						class="flex w-full items-start gap-2 px-2 py-1 hover:bg-black hover:text-white"
					>
						<div class="text-sm">
							<div class="opacity-70">{new Date(n.date).toLocaleDateString()}</div>
							<div class="leading-snug">{n.title}</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>

		<a
			href="/newsletter"
			class="mt-3 block w-full pb-2 text-center text-sm hover:bg-black hover:text-white"
		>
			See all
		</a>
	</section>
</div>
