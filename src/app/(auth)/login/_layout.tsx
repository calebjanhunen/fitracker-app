import { Stack } from 'expo-router';
import React from 'react';

export default function LoginLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='VerifyEmail' options={{ gestureEnabled: false }} />
            <Stack.Screen
                name='ForgotPassword'
                options={{ headerBackTitleVisible: false, headerShown: true, headerTitle: '' }}
            />
        </Stack>
    );
}
