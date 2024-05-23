import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaLayout } from 'src/components';
import { useAuth } from 'src/hooks/useAuth';
import LoginScreen from 'src/screens/login/screens/login.screen';
import AppNavigation from './app-navigation';

export default function BaseNavigation(): React.ReactElement {
    const { accessToken } = useAuth();

    return (
        <NavigationContainer>
            <SafeAreaLayout>{accessToken ? <AppNavigation /> : <LoginScreen />}</SafeAreaLayout>
        </NavigationContainer>
    );
}
