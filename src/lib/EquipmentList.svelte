<script lang="ts">
	import { onMount } from 'svelte';
	import { getEquipmentList } from '$lib/dataService';
	import type { Equipment } from '$lib/dataService';
	import EquipmentDetail from './EquipmentDetail.svelte';

	let equipmentList: Equipment[] = [];
	let selectedEquipment: Equipment | null = null;

	onMount(async () => {
		equipmentList = getEquipmentList();
	});

	function selectEquipment(equipment: Equipment): void {
		selectedEquipment = equipment;
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
