import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export function useCheckForUpdate() {
    useEffect(() => {
        void checkForUpdates();
    }, []);

    async function checkForUpdates() {
        if (Constants.expoConfig?.extra?.ENVIRONMENT === 'development') {
            return;
        }

        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                // Inform the user that the update has been downloaded and will be applied on the next app restart
                Alert.alert(
                    'Update Available',
                    'A new update was downloaded and will be applied when you restart the app.',
                    [
                        { text: 'Restart Now', onPress: async () => await Updates.reloadAsync() },
                        { text: 'Later' },
                    ]
                );
            }
        } catch (e) {
            Alert.alert(
                'Could not update.',
                `Error encountered when trying to update: ${e.message as string}`
            );
        }
    }
}
