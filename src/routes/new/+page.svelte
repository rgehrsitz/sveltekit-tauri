<!-- src/routes/new/+page.svelte -->

<script lang="ts">
	import { createEquipment } from '$lib/dataService';
	import type { Equipment } from '$lib/dataService';
	import { saveEquipmentToFile } from '$lib/dataService';
	import { goto } from '$app/navigation';

	let name = '';
	let type = '';
	let description = '';
	let children: Equipment[] = [];
	let properties: Record<string, any> = {};
	let directory = '';
	let filename = '';

	async function save() {
		const equipment = createEquipment(name, type, description, children, properties);
		// Save the equipment to the specified directory
		await saveEquipmentToFile(equipment);
		goto('/equipment');
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

		<label>
			Description:
			<input bind:value={description} required />
		</label>

		<!-- Add fields for children and properties as necessary -->

		<button type="submit">Save</button>
	</form>
</div>
