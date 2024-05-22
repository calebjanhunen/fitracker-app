import React from 'react';

import * as eva from '@eva-design/eva';
import '@expo/metro-runtime';
import { ApplicationProvider } from '@ui-kitten/components';

import { StatusBar } from 'react-native';
import BaseNavigation from 'src/navigation/base-navigation';

export default function App(): React.ReactElement | null {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <BaseNavigation />
            <StatusBar barStyle='dark-content' backgroundColor='transparent' />
        </ApplicationProvider>
    );
}
