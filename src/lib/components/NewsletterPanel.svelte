<script>
	let { items = [] } = $props();
</script>

<h3 class="float-end inline-block bg-brand-yellow px-1 py-1 text-xl">Newsletter</h3>

<section class="inline-block w-fit bg-brand-yellow text-black">
	<ul class="space-y-1">
		{#each items.slice(0, 10) as n}
			<li>
				<a
					href={n.url}
					class="flex w-full items-start gap-2 p-3 px-2 py-1 transition-colors hover:bg-black hover:text-white"
				>
					<!--
                        {#if n.image}
                            <img
                            src={n.image}
                            alt={'cover of ' + n.title}
                            class="h-10 w-10 object-cover"
                            loading="lazy"
                            />
                        {/if}
                        -->

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
