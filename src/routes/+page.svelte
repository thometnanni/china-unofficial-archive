<script>
	import Featured from '$lib/components/Featured.svelte';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Splash from '$lib/components/Splash.svelte';
</script>

<Splash />
<MenuBar />

<svelte:boundary>
	<Featured />
	{#snippet pending()}
		<p>loading...</p>
	{/snippet}
</svelte:boundary>
