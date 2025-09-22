<script>
	export let items = [];
</script>

<section class="bg-brand-yellow p-3 text-black">
	<h3 class=" mb-2 text-sm font-semibold">Newsletter</h3>
	<ul class="space-y-2">
		{#each items.slice(0, 10) as n}
			<li>
				<a href={n.url} class="block transition-colors hover:bg-black hover:text-white">
					<div class="grid grid-cols-[auto_1fr] items-start gap-2">
						<!-- {#if n.image}
							<img
								src={n.image}
								alt={'cover of ' + n.title}
								class="h-10 w-10 object-cover"
								loading="lazy"
							/>
						{/if} -->
						<div class="pb-2 text-sm">
							<div class="opacity-70">{new Date(n.date).toLocaleDateString()}</div>
							<div class="leading-snug">{n.title}</div>
						</div>
					</div>
				</a>
			</li>
		{/each}
	</ul>
	<a href="/newsletter" class="mt-3 inline-block text-sm underline">See all</a>
</section>
