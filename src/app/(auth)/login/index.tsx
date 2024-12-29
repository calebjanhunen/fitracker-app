import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import fitrackerLogo from '../../../../assets/fitracker-transparent-logo.png';

import { IErrorResponse } from 'src/api/client';
import { useLogin } from 'src/api/hooks';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { Button, Image, Input, Spinner, Text, XStack, YStack } from 'tamagui';

export default function Login() {
    const { login, isPending, error } = useLogin(onLoginSuccess, onLoginError);
    const [username, setUsername] = useState<string>('caleb_test');
    const [password, setPassword] = useState<string>('123');
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const router = useRouter();
    const { setAccessToken } = useAuth();

    function onLoginSuccess(accessToken: string) {
        setAccessToken(accessToken);
    }

    function onLoginError(e: IErrorResponse) {
        if (e.statusCode === 403) {
            router.push({
                pathname: '/login/VerifyEmail',
                params: {
                    username,
                    email: e.message,
                    password,
                },
            });
        }
    }

    useEffect(() => {
        setButtonDisabled(!username || !password || isPending);
    }, [username, password]);

    return (
        <ScreenViewWithKeyboard>
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
                    {isPending ? <Spinner /> : 'Login'}
                </Button>
                {error && (
                    <Text color='$red11Light' textAlign='center'>
                        Login failed. {error.message}
                    </Text>
                )}
                <Link
                    href='/login/ForgotPassword'
                    style={{ textAlign: 'center', textDecorationLine: 'underline' }}
                >
                    Forgot Password?
                </Link>
            </YStack>
            <XStack alignItems='center' justifyContent='center' paddingTop='$2' gap='$2'>
                <Text>Don&apos;t have an account?</Text>
                <Link
                    push
                    href='/(auth)/signup/EnterEmail'
                    style={{
                        textDecorationLine: 'underline',
                    }}
                >
                    Sign up
                </Link>
            </XStack>
        </ScreenViewWithKeyboard>
    );
}
