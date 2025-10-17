<script>
	let { value } = $props();

	import { m } from '$lib/paraglide/messages.js';
</script>

<section id="search" class="border-b sticky top-7 z-2">
	<div class="visible">
		<input
			type="text"
			class="w-full border-transparent"
			bind:value
			placeholder={m.search_placeholder()}
		/>
	</div>
	<div class="hidden">
		<select>
			<option>A</option>
			<option>B</option>
		</select>
	</div>
</section>

<style>
	#search {
		&:focus-within {
			.hidden {
				display: block;
			}
		}
	}
</style>
