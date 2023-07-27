import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../features/account/screens/LoginScreen';

const Stack = createStackNavigator();

export default function AccountNavigation(): React.ReactElement {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    );
}
