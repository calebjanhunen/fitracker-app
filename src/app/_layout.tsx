import { QueryClientProvider } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { Provider } from 'react-redux';
import { queryClient } from 'src/api/react-query-client';
import { AuthProvider } from 'src/context/auth-context/AuthContext';
import { store } from 'src/redux/Store';
import { PortalProvider, TamaguiProvider, Theme } from 'tamagui';
import config from '../../tamagui.config';

export default function RootLayout() {
    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <PortalProvider shouldAddRootHost>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <QueryClientProvider client={queryClient}>
                    <TamaguiProvider config={config}>
                        <Theme name='light'>
                            <Provider store={store}>
                                <AuthProvider>
                                    <Slot />
                                </AuthProvider>
                            </Provider>
                        </Theme>
                        <StatusBar barStyle='default' />
                    </TamaguiProvider>
                    {Constants.expoConfig?.extra?.ENVIRONMENT === 'development' && (
                        <DevToolsBubble />
                    )}
                </QueryClientProvider>
            </GestureHandlerRootView>
        </PortalProvider>
    );
}
