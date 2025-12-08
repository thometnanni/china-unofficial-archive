<script>
	import { localizeHref } from '$lib/paraglide/runtime';
	let { items = [] } = $props();
</script>

<div class="flex h-full flex-col text-black">
	<div class="relative min-h-0 flex-1">
		<ul class="max-h-[100vh] space-y-1 overflow-auto pr-2">
			{#each items as n, index}
				<li class={index >= 3 ? 'hidden sm:list-item' : ''}>
					<a
						href={localizeHref(`/archive/${n.id}`)}
						class="flex w-full items-start gap-2 px-2 py-1 hover:text-brand"
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
