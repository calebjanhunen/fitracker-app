import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { Provider } from 'react-redux';
import { AuthProvider } from 'src/context/auth-context/AuthContext';
import { store } from 'src/redux/Store';
import { PortalProvider, TamaguiProvider, Theme } from 'tamagui';
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
        <PortalProvider shouldAddRootHost>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <QueryClientProvider client={queryClient}>
                    <TamaguiProvider config={config}>
                        <Theme name='light'>
                            <AuthProvider>
                                <Provider store={store}>
                                    <Slot />
                                </Provider>
                            </AuthProvider>
                        </Theme>
                        <StatusBar barStyle='default' />
                    </TamaguiProvider>
                </QueryClientProvider>
            </GestureHandlerRootView>
            <DevToolsBubble />
        </PortalProvider>
    );
}
