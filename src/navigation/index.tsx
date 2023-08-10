import React, { useContext, useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from '../services/context/AuthContext';
import AccountNavigation from './AccountNavigation';
import AppNavigation from './AppNavigation';

export default function BaseNavigation(): React.ReactElement {
    const { session } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { persistLogin } = useAuth();

    useEffect(() => {
        const persist = async (): Promise<void> => {
            setIsLoading(true);
            await persistLogin();
            setIsLoading(false);
        };
        void persist();
    }, []);

    // TODO: Change to better loading screen eventually
    if (isLoading) {
        return <ActivityIndicator style={{ flex: 1 }} size='large' />;
    }
    return (
        <NavigationContainer>
            {session ? <AppNavigation /> : <AccountNavigation />}
        </NavigationContainer>
    );
}
