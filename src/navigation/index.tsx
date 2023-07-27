import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../services/auth/authContext';
import AccountNavigation from './AccountNavigation';
import AppNavigation from './AppNavigation';

export default function BaseNavigation(): React.ReactElement {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigation /> : <AccountNavigation />}
        </NavigationContainer>
    );
}
