import React from 'react';

import * as eva from '@eva-design/eva';
import '@expo/metro-runtime';
import { ApplicationProvider } from '@ui-kitten/components';

import BaseNavigation from 'src/navigation/base-navigation';

export default function App(): React.ReactElement | null {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <BaseNavigation />
        </ApplicationProvider>
    );
}
