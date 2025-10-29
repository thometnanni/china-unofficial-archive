<script>
	let { items = [] } = $props();
</script>

<div class="inline-block text-black">
	<section class="bg-brand-yellow">
		<div class="px-2 py-1 text-2xl">Newsletter</div>
		<ul class="space-y-1">
			{#each items.slice(0, 10) as n}
				<li>
					<a
						href={n.url}
						class="flex w-full items-start gap-2 px-2 py-1 hover:bg-black hover:text-white"
					>
						<div class="text-base">
							<div class="text-sm opacity-70">{new Date(n.date).toLocaleDateString()}</div>
							<div class="text-base leading-snug">{n.title}</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>

		<a
			href="https://chinaunofficialarchives.substack.com/"
			class="mt-3 block w-full pb-2 text-center text-sm hover:bg-black hover:text-white"
		>
			See all
		</a>
	</section>
</div>
