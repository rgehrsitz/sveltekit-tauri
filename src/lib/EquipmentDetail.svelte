<!-- src/lib/EquipmentDetail.svelte -->

<script lang="ts">
	import type { Equipment } from '$lib/dataService';

	export let selectedEquipment: Equipment;
</script>

<div class="container mx-auto px-4">
	<h1 class="text-4xl font-bold mb-4">Equipment Detail</h1>

	<div>
		<h2>{selectedEquipment.name}</h2>
		<p>Type: {selectedEquipment.type}</p>
		<p>Description: {selectedEquipment.description}</p>

		<h3>Children:</h3>
		<ul>
			{#each selectedEquipment.children as child}
				<li>{child.name}</li>
			{/each}
		</ul>

		<h3>Properties:</h3>
		<ul>
			{#each Object.entries(selectedEquipment.properties) as [key, value]}
				<li>{key}: {value}</li>
			{/each}
		</ul>
	</div>
</div>
