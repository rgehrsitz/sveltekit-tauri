<script lang="ts">
	import { onMount } from 'svelte';
	import { getEquipmentList, addEquipment } from '$lib/dataService';
	import type { Equipment } from '$lib/dataService';
	import EquipmentDetail from './EquipmentDetail.svelte';

	let equipmentList: Equipment[] = [];
	let selectedEquipment: Equipment | null = null;
	let newEquipment: Partial<Equipment> = {};

	onMount(async () => {
		equipmentList = await getEquipmentList();
	});

	function selectEquipment(equipment: Equipment): void {
		selectedEquipment = equipment;
	}

	async function saveNewEquipment(): Promise<void> {
		if (newEquipment.name && newEquipment.type) {
			await addEquipment(newEquipment as Equipment);
			newEquipment = {};
			equipmentList = await getEquipmentList();
		}
	}
</script>

<ul>
	{#each equipmentList as equipment (equipment.id)}
		<li>
			<h2>{equipment.name}</h2>
			<p>{equipment.type}</p>
			<button on:click={() => selectEquipment(equipment)}>View Details</button>
		</li>
	{/each}
</ul>

{#if selectedEquipment}
	<EquipmentDetail {selectedEquipment} />
{/if}

<div>
	<h2>Add New Equipment</h2>
	<label>
		Name
		<input type="text" bind:value={newEquipment.name} />
	</label>
	<label>
		Type
		<input type="text" bind:value={newEquipment.type} />
	</label>
	<button on:click={saveNewEquipment}>Save</button>
</div>
