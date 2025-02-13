import { Link, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { SizableText, useTheme, XStack } from 'tamagui';

export default function SignupLayout() {
    const theme = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
            <Stack
                screenOptions={{
                    headerTitle: '',
                    headerStyle: { backgroundColor: theme.background.val },
                }}
                initialRouteName='EnterEmail'
            >
                <Stack.Screen name='EnterEmail' />
                <Stack.Screen name='EnterCode' />
                <Stack.Screen name='EnterAccountInfo' />
                <Stack.Screen name='EnterUsernameAndPassword' />
            </Stack>
            <Footer />
        </SafeAreaView>
    );
}

function Footer() {
    return (
        <XStack alignItems='center' justifyContent='center' gap='$2'>
            <SizableText>Already have an account?</SizableText>
            <Link
                push
                href='/(auth)/login'
                style={{
                    textDecorationLine: 'underline',
                }}
            >
                Login
            </Link>
        </XStack>
    );
}
