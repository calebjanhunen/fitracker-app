import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import fitrackerLogo from '../../../../assets/fitracker-transparent-logo.png';

import { useLogin } from 'src/hooks/auth/useLogin';
import { Button, Image, Input, Spinner, Text, useTheme, View, XStack, YStack } from 'tamagui';

export default function Login() {
    const theme = useTheme();
    const { login, isLoading, error } = useLogin();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        setButtonDisabled(!username || !password || isLoading);
    }, [username, password]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View flex={1} paddingHorizontal='$5'>
                    <YStack flex={1} justifyContent='center' gap='$5'>
                        <Image alignSelf='center' source={fitrackerLogo} width={100} height={100} />
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
                            onPress={() => login({ username, password })}
                            disabled={buttonDisabled}
                            opacity={buttonDisabled ? 0.5 : 1}
                        >
                            {isLoading ? <Spinner /> : 'Login'}
                        </Button>
                        {error && (
                            <Text color='$red11Light' textAlign='center'>
                                Login failed. {error.message}
                            </Text>
                        )}
                        <Link
                            href='/(auth)/login'
                            style={{ textAlign: 'center', textDecorationLine: 'underline' }}
                        >
                            Forgot Password?
                        </Link>
                    </YStack>
                    <XStack alignItems='center' justifyContent='center' paddingTop='$2' gap='$2'>
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
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
