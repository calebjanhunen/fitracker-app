import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

export function useCheckForUpdate() {
    const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);
    const [isCheckingForUpdate, setIsCheckingForUpdate] = useState<boolean>(true); // Optional to show loader during checking

    useEffect(() => {
        const checkForUpdates = async () => {
            try {
                const update = await Updates.checkForUpdateAsync();
                if (update.isAvailable) {
                    setIsUpdateAvailable(true);
                }
            } catch (error) {
                return;
            } finally {
                setIsCheckingForUpdate(false); // Stop checking once done
            }
        };

        void checkForUpdates();
    }, []);

    const handleUpdate = async () => {
        try {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
        } catch (error) {
            console.error('Error fetching update:', error);
        }
    };

    return {
        isUpdateAvailable,
        isCheckingForUpdate,
        handleUpdate,
    };
}
