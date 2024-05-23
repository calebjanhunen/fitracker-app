import React from 'react';
import 'react-native-gesture-handler';

import * as eva from '@eva-design/eva';
import '@expo/metro-runtime';
import { ApplicationProvider } from '@ui-kitten/components';

import { StatusBar } from 'react-native';
import { AuthProvider } from 'src/context/auth-context';
import BaseNavigation from 'src/navigation/base-navigation';

export default function App(): React.ReactElement | null {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <AuthProvider>
                <BaseNavigation />
                <StatusBar barStyle='dark-content' backgroundColor='transparent' />
            </AuthProvider>
        </ApplicationProvider>
    );
}
