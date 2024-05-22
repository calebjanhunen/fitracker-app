import React from 'react';

import * as eva from '@eva-design/eva';
import '@expo/metro-runtime';
import { ApplicationProvider } from '@ui-kitten/components';

import AppNavigation from 'src/navigation/app-navigation';

export default function App(): React.ReactElement | null {
    // console.log(eva.light);
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <AppNavigation />
        </ApplicationProvider>
    );
}
