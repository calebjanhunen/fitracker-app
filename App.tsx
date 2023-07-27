import React from 'react';
import { View } from 'react-native';

import { PortalProvider } from '@gorhom/portal';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';

import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts,
} from '@expo-google-fonts/inter';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BaseNavigation from './src/navigation';
import { AuthProvider } from './src/services/auth/authContext';
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
            <AuthProvider>
                <PortalProvider>
                    <ThemeProvider theme={theme}>
                        <BottomSheetModalProvider>
                            <View style={{ flex: 1 }}>
                                <BaseNavigation />
                                <StatusBar style='auto' />
                            </View>
                        </BottomSheetModalProvider>
                    </ThemeProvider>
                </PortalProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
