import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { useConfirmEmailVerificationCode } from 'src/hooks/auth/useConfirmEmailVerificationCode';
import { useLogin } from 'src/hooks/auth/useLogin';
import { H3, Input, SizableText, Spinner } from 'tamagui';

export default function VerifyEmail() {
    const { username, email, password } = useLocalSearchParams<{
        username: string;
        email: string;
        password: string;
    }>();
    const [code, setCode] = useState<string>('');
    const {
        confirmCode,
        isLoading: isConfirmEmailCodeLoading,
        error: confirmCodeError,
    } = useConfirmEmailVerificationCode(onConfirmEmailVerificationCodeSuccess);
    const { login, isLoading: isLoginLoading, error: loginError } = useLogin();
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        if (confirmCodeError) {
            setErrorMsg(confirmCodeError.message);
        } else if (loginError) {
            setErrorMsg(loginError.message);
        }
    }, [confirmCodeError, loginError]);

    function onConfirmEmailVerificationCodeSuccess() {
        login({ username, password });
    }

    return (
        <ScreenViewWithKeyboard>
            <H3 marginBottom='$space.4'>Email Address is not validated</H3>
            <SizableText size='$5' marginBottom='$space.6'>
                A 6-digit verification code has been sent to your email. Enter the code below to
                verify your email address.
            </SizableText>
            <Input
                onChangeText={(text) => setCode(text.toUpperCase())}
                size='$5'
                placeholder='Code'
                marginBottom='$space.5'
                value={code}
            />
            <Button
                onPress={() => confirmCode({ email, code })}
                color='$blue10'
                backgroundColor='$blue6'
                disabled={!code}
                marginBottom='$space.2'
            >
                {isLoginLoading || isConfirmEmailCodeLoading ? <Spinner /> : 'Verify Email'}
            </Button>
            {errorMsg && errorMsg !== email && (
                <SizableText textAlign='center' color='$red10'>
                    {errorMsg}
                </SizableText>
            )}
        </ScreenViewWithKeyboard>
    );
}
