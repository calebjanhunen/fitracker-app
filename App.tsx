import { PortalProvider } from '@gorhom/portal';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import AppNavigation from 'src/navigation/app-navigation';

export default function App(): React.ReactElement | null {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MenuProvider>
                <PortalProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <AppNavigation />
                    </SafeAreaView>
                </PortalProvider>
            </MenuProvider>
        </GestureHandlerRootView>
    );
}
