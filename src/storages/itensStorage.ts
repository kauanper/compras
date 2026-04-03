import AsyncStorage from '@react-native-async-storage/async-storage';
import {FilterStatus} from "../types/FilterStatus";

const ITENS_STORAGE_KEY = "@comprar:itens";

export type ItemStorage = {
    id: string,
    status: FilterStatus,
    description: string,
}

async function get(): Promise<ItemStorage[]> {
    try {
        const storage = (await AsyncStorage.getItem(ITENS_STORAGE_KEY));
        return storage ? JSON.parse(storage) : [];
    }catch (error) {
        throw new Error("GET_ITENS_STORAGE: " + error);
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const storage = await get();
    return storage.filter(item => item.status === status);
}

export const itemsStorage = {
    get,
    getByStatus,
}