// src/lib/dataService.ts
import { v4 as uuidv4 } from 'uuid';

export interface EquipmentDetails {
    firmwareVersion?: string;
    // Add other details as needed
}

export interface Equipment {
    id: string;
    name: string;
    type: string;
    description: string;
    children: Equipment[];
    properties: Record<string, any>;
}

interface Snapshot {
    id: number;
    timestamp: number;
    configuration: Equipment[];
}

let snapshotId = 0;

const equipmentList: Equipment[] = [];
const snapshotList: Snapshot[] = [];

export function createEquipment (name: string, type: string, description: string, children: Equipment[] = [], properties: Record<string, any> = {}): Equipment {
    const equipment: Equipment = { id: uuidv4(), name, type, description, children, properties };
    equipmentList.push(equipment);
    return equipment;
}

export function getEquipment (id: string): Equipment | undefined {
    return equipmentList.find(equipment => equipment.id === id);
}

export function getEquipmentList (): Equipment[] {
    return [...equipmentList];
}

export function updateEquipment (id: string, name: string, type: string, description: string, children: Equipment[] = [], properties: Record<string, any> = {}): Equipment | undefined {
    const equipment = getEquipment(id);
    if (equipment) {
        equipment.name = name;
        equipment.type = type;
        equipment.description = description;
        equipment.children = children;
        equipment.properties = properties;
    }
    return equipment;
}

export function deleteEquipment (id: string): void {
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
