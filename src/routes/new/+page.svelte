<script lang="ts">
	import { createEquipment } from '$lib/dataService';
	import { goto } from '$app/navigation';

	let name = '';
	let type = '';
	// Add other fields as necessary

	function save() {
		createEquipment({ name, type /*, other fields */ });
		goto('/home');
	}
</script>

<div class="container mx-auto px-4">
	<h1 class="text-4xl font-bold mb-4">New Configuration</h1>

	<form on:submit|preventDefault={save}>
		<label>
			Name:
			<input bind:value={name} required />
		</label>

		<label>
			Type:
			<input bind:value={type} required />
		</label>

		<!-- Add other fields as necessary -->

		<button type="submit">Save</button>
	</form>
</div>
