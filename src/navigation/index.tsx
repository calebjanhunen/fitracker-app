import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AccountNavigation from './AccountNavigation';
import AppNavigation from './AppNavigation';

export default function BaseNavigation(): React.ReactElement {
    const isAuthenticated = false;
    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigation /> : <AccountNavigation />}
        </NavigationContainer>
    );
}
