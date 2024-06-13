import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from 'src/screens/login/screens/login.screen';
import AppNavigation from './app-navigation';
import { useAuth } from 'src/state/context/auth-context';

export default function BaseNavigation(): React.ReactElement {
    const { accessToken } = useAuth();

    return (
        <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
                {accessToken ? <AppNavigation /> : <LoginScreen />}
            </SafeAreaView>
        </NavigationContainer>
    );
}
