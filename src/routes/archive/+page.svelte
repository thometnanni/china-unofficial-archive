<script>
	import Meta from '$lib/components/Meta.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Archive from '$lib/components/Archive.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<Meta title={m.title()} description={m.slogan()} image="/cover.png" />
<MenuBar />
<Hero />
<Archive />
<Footer />
