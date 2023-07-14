// src/lib/dataService.ts

interface EquipmentDetails {
    firmwareVersion?: string;
    // Add other details as needed
}

interface Equipment {
    id: number;
    name: string;
    type: string;
    parent: string;
    details: EquipmentDetails;
}

interface Snapshot {
    id: number;
    timestamp: number;
    configuration: Equipment[];
}

let equipmentId = 0;
let snapshotId = 0;

const equipmentList: Equipment[] = [];
const snapshotList: Snapshot[] = [];

export function createEquipment (name: string, type: string, parent: string, details: EquipmentDetails): Equipment {
    const equipment: Equipment = { id: equipmentId++, name, type, parent, details };
    equipmentList.push(equipment);
    return equipment;
}

export function getEquipment (id: number): Equipment | undefined {
    return equipmentList.find(equipment => equipment.id === id);
}

export function getEquipmentList (): Equipment[] {
    return [...equipmentList];
}

export function updateEquipment (id: number, name: string, type: string, parent: string, details: EquipmentDetails): Equipment | undefined {
    const equipment = getEquipment(id);
    if (equipment) {
        equipment.name = name;
        equipment.type = type;
        equipment.parent = parent;
        equipment.details = details;
    }
    return equipment;
}

export function deleteEquipment (id: number): void {
    const index = equipmentList.findIndex(equipment => equipment.id === id);
    if (index !== -1) {
        equipmentList.splice(index, 1);
    }
}

export function createSnapshot (): Snapshot {
    const snapshot: Snapshot = { id: snapshotId++, timestamp: Date.now(), configuration: [...equipmentList] };
    snapshotList.push(snapshot);
    return snapshot;
}

export function getSnapshot (id: number): Snapshot | undefined {
    return snapshotList.find(snapshot => snapshot.id === id);
}

export function getSnapshots (): Snapshot[] {
    return [...snapshotList];
}
