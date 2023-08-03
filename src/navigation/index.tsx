import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../services/auth/authContext';
import AccountNavigation from './AccountNavigation';
import AppNavigation from './AppNavigation';

export default function BaseNavigation(): React.ReactElement {
    const { sessionToken } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {sessionToken !== null ? <AppNavigation /> : <AccountNavigation />}
        </NavigationContainer>
    );
}
