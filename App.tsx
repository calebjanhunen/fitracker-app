import { PortalProvider } from '@gorhom/portal';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';

export default function App(): React.ReactElement | null {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MenuProvider>
                <PortalProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Text>HELLO</Text>
                    </SafeAreaView>
                </PortalProvider>
            </MenuProvider>
        </GestureHandlerRootView>
    );
}
