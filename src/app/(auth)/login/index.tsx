import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'src/context/auth-context/AuthContext';
import fitrackerLogo from '../../../../assets/fitracker-icon.png';

import { Button, Image, Input, Spinner, Text, useTheme, View, XStack, YStack } from 'tamagui';

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
                    <View flex={1} paddingHorizontal='$5' backgroundColor='white'>
                        <YStack flex={1} justifyContent='center' gap='$5'>
                            <Image
                                alignSelf='center'
                                source={fitrackerLogo}
                                width={100}
                                height={100}
                            />
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
                            <XStack
                                alignItems='center'
                                justifyContent='center'
                                paddingTop='$2'
                                gap='$2'
                            >
                                <Text>Don&apos;t have an account?</Text>
                                <Link
                                    push
                                    href='/(auth)/signup'
                                    style={{
                                        textDecorationLine: 'underline',
                                    }}
                                >
                                    Sign up
                                </Link>
                            </XStack>
                        </YStack>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
