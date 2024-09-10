/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from 'src/context/auth-context/AuthContext';
import { TamaguiProvider, Theme } from 'tamagui';
import config from '../../tamagui.config';

const queryClient = new QueryClient();

export default function RootLayout() {
    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <TamaguiProvider config={config}>
                <Theme name='light'>
                    <AuthProvider>
                        <Slot />
                    </AuthProvider>
                </Theme>
                <StatusBar barStyle='default' />
            </TamaguiProvider>
        </QueryClientProvider>
    );
}
