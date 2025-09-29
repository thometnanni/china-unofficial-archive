<script>
	let { items = [] } = $props();
</script>

<div class="inline-block text-black">
	<div class="flex flex-row-reverse items-end">
		<div class="z-10 -mb-2 bg-brand-yellow px-4 py-1 text-xl">Newsletter</div>
	</div>
	<section class=" bg-brand-yellow pt-4 pb-2">
		<ul class="space-y-1">
			{#each items.slice(0, 10) as n}
				<li>
					<a
						href={n.url}
						class="flex w-full items-start gap-2 px-2 py-1 hover:bg-black hover:text-white"
					>
						<div class="text-base">
							<div class="opacity-70">{new Date(n.date).toLocaleDateString()}</div>
							<div class="leading-snug">{n.title}</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>

		<a
			href="/newsletter"
			class="mt-3 block w-full rounded pb-2 text-center text-sm hover:bg-black hover:text-white"
		>
			See all
		</a>
	</section>
</div>
