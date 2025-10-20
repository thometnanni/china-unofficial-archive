<script>
	import { m } from '$lib/paraglide/messages';
	// import Logo from '$lib/components/Logo.svelte';
</script>

<article class="flex min-h-[200px] flex-col bg-black text-white">
	<div class="max-w-[800px] p-2 text-2xl">
		<p>
			{m.claim()}
		</p>
	</div>

	<div class="max-w-[200px] mt-10 mb-5">
		<!-- <Logo textColor={'#fff'} /> -->
	</div>
</article>
