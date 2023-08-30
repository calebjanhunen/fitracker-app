import React from 'react';
import { SafeAreaView } from 'react-native';

import { PortalProvider } from '@gorhom/portal';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from 'styled-components';

import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts,
} from '@expo-google-fonts/inter';
import BaseNavigation from './src/navigation';
import { AuthProvider } from './src/services/context/AuthContext';
import { theme } from './src/theme/theme';

export default function App(): React.ReactElement | null {
    const [fontLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <MenuProvider>
                        <PortalProvider>
                            <SafeAreaView style={{ flex: 1 }}>
                                <BaseNavigation />
                                <StatusBar style='auto' />
                            </SafeAreaView>
                        </PortalProvider>
                    </MenuProvider>
                </AuthProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
