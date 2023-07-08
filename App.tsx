import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';

import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts,
} from '@expo-google-fonts/inter';
import AppNavigation from './src/navigation/AppNavigation';
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
        <ThemeProvider theme={theme}>
            <View style={{ flex: 1 }}>
                <AppNavigation />
                <StatusBar style='auto' />
            </View>
        </ThemeProvider>
    );
}
