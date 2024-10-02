import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'src/context/auth-context/AuthContext';

import { Button, H1, H6, Input, Spinner, Text, useTheme, View, YStack } from 'tamagui';

export default function Login() {
    const theme = useTheme();
    const { login, loading, errorMsg } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        setButtonDisabled(!username || !password || loading);
    }, [username, password]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <H6>PROD Api url: {Constants.expoConfig?.extra?.PROD_API_URL}</H6>
                    <H6>Environment: {Constants.expoConfig?.extra?.ENVIRONMENT}</H6>
                    <View flex={1} paddingHorizontal='$5'>
                        <H1 size='$10' textAlign='center' paddingTop='$10'>
                            Fitracker
                        </H1>
                        <YStack flex={1} justifyContent='center' gap='$5'>
                            <Input
                                placeholder='Username'
                                onChangeText={setUsername}
                                size='$5'
                                autoCapitalize='none'
                            />
                            <Input
                                placeholder='Password'
                                onChangeText={setPassword}
                                size='$5'
                                secureTextEntry={true}
                            />
                            <Button
                                marginTop='$5'
                                onPress={async () => await login(username, password)}
                                disabled={buttonDisabled}
                                opacity={buttonDisabled ? 0.5 : 1}
                            >
                                {loading ? <Spinner /> : 'Login'}
                            </Button>
                            {errorMsg && (
                                <Text color='$red11Light' textAlign='center'>
                                    {errorMsg}
                                </Text>
                            )}
                        </YStack>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
