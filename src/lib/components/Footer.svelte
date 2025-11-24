<script>
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	// import Logo from '$lib/components/Logo.svelte';
</script>

<article class="flex flex-col bg-black text-white">
	<ul class="flex flex-wrap gap-4 p-2">
		<li><a class="text-2xl" href={localizeHref('/about/')}>{m.nav_about()}</a></li>
		<li><a class="text-2xl" href={localizeHref('/resources/')}>{m.nav_resources()}</a></li>
		<li>
			<a class="text-2xl" href={'mailto:minjiandanganguan@gmail.com'}
				>{m.nav_contact ? m.nav_contact() : 'contact'}</a
			>
		</li>
	</ul>
	<div class="max-w-[800px] p-2 text-xl">
		<p>© {m.title()}</p>
		<!-- <p>
			{m.claim()}
		</p> -->
	</div>

	<div class="mt-10 mb-5 max-w-[200px]">
		<!-- <Logo textColor={'#fff'} /> -->
	</div>
</article>
