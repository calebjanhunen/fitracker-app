import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../services/auth/authContext';
import AccountNavigation from './AccountNavigation';
import AppNavigation from './AppNavigation';

export default function BaseNavigation(): React.ReactElement {
    const { user } = useContext(AuthContext);

    // TODO: Change to better loading screen eventually
    // if (isFetchingUser) {
    //     return <ActivityIndicator style={{ flex: 1 }} size='large' />;
    // }
    return (
        <NavigationContainer>
            {user.sessionToken ? <AppNavigation /> : <AccountNavigation />}
        </NavigationContainer>
    );
}
