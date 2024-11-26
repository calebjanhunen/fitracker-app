import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { Spinner, View } from 'tamagui';

export default function AuthLayout() {
    const { isRefreshTokenFetching, status } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (status === 'success') {
            router.replace('/workout-tracker');
        }
    }, [status]);

    if (!status || status === 'idle' || isRefreshTokenFetching) {
        return (
            <View flex={1} alignItems='center' justifyContent='center'>
                <Spinner size='large' color='$blue10' />
            </View>
        );
    }

    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='signup' options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name='login' options={{ gestureEnabled: false, headerShown: false }} />
        </Stack>
    );
}
