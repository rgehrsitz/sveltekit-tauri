<script lang="ts">
	import { onMount } from 'svelte';
	import { getEquipmentList, addEquipment } from '$lib/dataService';
	import type { Equipment } from '$lib/dataService';
	import EquipmentDetail from './EquipmentDetail.svelte';
	import { Button } from 'flowbite-svelte';

	export let equipmentList: Equipment[] = [];
	export let selectedEquipment: Equipment | null = null;
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

	function updatePropertyName(oldKey: string, event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target) {
			const newKey = target.value;
			if (oldKey in newProperties) {
				newProperties[newKey] = newProperties[oldKey];
				delete newProperties[oldKey];
			}
		}
	}

	function updatePropertyValue(key: string, event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target) {
			newProperties[key] = target.value;
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
				<input type="text" value={key} on:change={(e) => updatePropertyName(key, e)} />
			</label>
			<label>
				Property Value
				<input
					type="text"
					bind:value={newProperties[key]}
					on:change={(e) => updatePropertyValue(key, e)}
				/>
			</label>
		</div>
	{/each}
	<Button on:click={addProperty}>Add Property</Button>
	<Button on:click={saveNewEquipment}>Save</Button>
</div>

{#if selectedEquipment}
	<EquipmentDetail {selectedEquipment} />
{/if}
