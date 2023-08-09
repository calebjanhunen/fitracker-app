import React from 'react';
import { View } from 'react-native';

import { APPLICATION_ID, JS_KEY, SERVER_URL } from '@env';
import { PortalProvider } from '@gorhom/portal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Parse from 'parse/react-native';
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

    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize(APPLICATION_ID, JS_KEY);
    Parse.serverURL = SERVER_URL;

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
