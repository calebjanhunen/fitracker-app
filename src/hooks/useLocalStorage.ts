import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUseLocalStorage {
    saveToStorage: (key: string, value: string) => Promise<void>;
    getFromStorage: (key: string) => Promise<string | null>;
}

export function useLocalStorage(): IUseLocalStorage {
    async function saveToStorage(key: string, value: string): Promise<void> {
        await AsyncStorage.setItem(key, value);
    }

    async function getFromStorage(key: string): Promise<string | null> {
        return await AsyncStorage.getItem(key);
    }

    return { saveToStorage, getFromStorage };
}
