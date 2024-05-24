import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { useAuth } from 'src/hooks/useAuth';
import LoginScreen from 'src/screens/login/screens/login.screen';
import AppNavigation from './app-navigation';

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
