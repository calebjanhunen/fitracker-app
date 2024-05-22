import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import LoginScreen from 'src/screens/login/screens/login.screen';
import AppNavigation from './app-navigation';

export default function BaseNavigation(): React.ReactElement {
    const accessToken = undefined;

    return (
        <NavigationContainer>
            {accessToken ? <AppNavigation /> : <LoginScreen />}
        </NavigationContainer>
    );
}
