import AsyncStorage from '@react-native-async-storage/async-storage';
import {FilterStatus} from "../types/FilterStatus";

const ITENS_STORAGE_KEY = "@comprar:itens";

export type ItemStorage = {
    id: string,
    status: FilterStatus,
    description: string,
}

// 1. Busca a lista completa
async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITENS_STORAGE_KEY);
        return storage ? JSON.parse(storage) : [];
    } catch (error) {
        throw new Error("GET_ITENS_STORAGE: " + error);
    }
}

// 2. Filtra por status
async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const storage = await get();
    return storage.filter(item => item.status === status);
}

// 3. Salva uma lista inteira (Sobrescreve a anterior)
async function save(items: ItemStorage[]): Promise<void> {
    try {
        const storage = JSON.stringify(items);
        await AsyncStorage.setItem(ITENS_STORAGE_KEY, storage);
    } catch (error) {
        throw new Error("SAVE_ITENS_STORAGE: " + error);
    }
}

// 4. Adiciona um único novo item à lista existente
async function add(newItem: ItemStorage): Promise<void> {
    try {
        // Busca o que já tem lá
        const storedItems = await get();

        // Monta a nova lista (Antigos + Novo)
        const updatedList = [...storedItems, newItem];

        // Usa o metodo save que criamos acima para gravar no celular
        await save(updatedList);
    } catch (error) {
        throw new Error("ADD_ITEM_STORAGE: " + error);
    }
}

// 5. Metodo de remover um único elemento da lista
async function remove(idItem: string): Promise<void> {
    try {
        const storedItems = await get();
        const updatedList = storedItems.filter((item) => item.id !== idItem);
        await save(updatedList);
    } catch (error) {
        throw new Error("REMOVE_ITEM_STORAGE: " + error);
    }
}

// 5. Metodo para limpar nossa lista
async function clear(): Promise<void> {
    try {
        AsyncStorage.removeItem(ITENS_STORAGE_KEY);
    }catch (error) {
        throw new Error("CLEAR_ITEM_STORAGE: " + error);
    }
}

async function toggleStatus(idItem: string): Promise<void> {
    try {
        const storageList = await get();

        const updatedList = storageList.map((item) => {
            if (item.id === idItem) {
                const newStatus = item.status === FilterStatus.PENDING
                    ? FilterStatus.DONE
                    : FilterStatus.PENDING;
                return { ...item, status: newStatus };
            }
            return item;
        });
        await save(updatedList);
    } catch (error) {
        throw new Error("TOGGLE_STATUS_STORAGE: " + error);
    }
}

export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
    clear,
    toggleStatus,
}