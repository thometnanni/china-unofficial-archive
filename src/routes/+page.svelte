<script>
	import Featured from '$lib/components/Featured.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Splash from '$lib/components/Splash.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Meta from '$lib/components/Meta.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<Meta />
<MenuBar />

<Splash />

<div class="relative z-200 mt-[-160px]">
	<Featured />
</div>
<Footer />
