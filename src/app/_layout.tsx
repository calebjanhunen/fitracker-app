import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { queryClient } from 'src/api/react-query-client';
import { AuthProvider } from 'src/context/auth-context/AuthContext';
import { useCheckForUpdate } from 'src/hooks/common/useCheckForUpdate';
import { store } from 'src/redux/Store';
import { PortalProvider, TamaguiProvider, Theme } from 'tamagui';
import config from '../../tamagui.config';

export default function RootLayout() {
    const [loaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    });
    useCheckForUpdate();

    if (!loaded) {
        return null;
    }

    return (
        <PortalProvider shouldAddRootHost>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
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
                    </QueryClientProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </PortalProvider>
    );
}
