import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='signup' options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name='login' options={{ gestureEnabled: false, headerShown: false }} />
        </Stack>
    );
}
