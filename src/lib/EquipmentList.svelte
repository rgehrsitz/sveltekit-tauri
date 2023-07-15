<script lang="ts">
	import { onMount } from 'svelte';
	import { getEquipmentList, addEquipment } from '$lib/dataService';
	import type { Equipment } from '$lib/dataService';
	import EquipmentDetail from './EquipmentDetail.svelte';

	let equipmentList: Equipment[] = [];
	let selectedEquipment: Equipment | null = null;
	let newEquipment: Partial<Equipment> = {};
	let newProperties: Record<string, string> = {};

	onMount(async () => {
		equipmentList = await getEquipmentList();
	});

	function selectEquipment(equipment: Equipment): void {
		selectedEquipment = equipment;
	}

	async function saveNewEquipment(): Promise<void> {
		if (newEquipment.name && newEquipment.type) {
			newEquipment.properties = newProperties;
			await addEquipment(newEquipment as Equipment);
			newEquipment = {};
			newProperties = {};
			equipmentList = await getEquipmentList();
		}
	}

	function addProperty(): void {
		newProperties[''] = '';
	}

	function updatePropertyName(oldKey: string, newKey: string): void {
		if (oldKey in newProperties) {
			newProperties[newKey] = newProperties[oldKey];
			delete newProperties[oldKey];
		}
	}

	function updatePropertyValue(key: string, value: string): void {
		newProperties[key] = value;
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
	{#each Object.keys(newProperties) as key (key)}
		<div>
			<label>
				Property Name
				<input type="text" value={key} on:change={(e) => updatePropertyName(key, e.target.value)} />
			</label>
			<label>
				Property Value
				<input
					type="text"
					bind:value={newProperties[key]}
					on:change={(e) => updatePropertyValue(key, e.target.value)}
				/>
			</label>
		</div>
	{/each}
	<button on:click={addProperty}>Add Property</button>
	<button on:click={saveNewEquipment}>Save</button>
</div>
