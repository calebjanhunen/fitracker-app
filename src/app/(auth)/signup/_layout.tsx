import { Stack } from 'expo-router';
import React from 'react';

export default function SignupLayout() {
    return (
        <Stack screenOptions={{ headerTitle: '' }}>
            <Stack.Screen name='EnterEmail' />
            <Stack.Screen name='EnterCode' />
        </Stack>
    );
}
