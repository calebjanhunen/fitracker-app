import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { useConfirmEmailVerificationCode } from 'src/hooks/auth/useConfirmEmailVerificationCode';
import { updateCodeVerified } from 'src/redux/signup-form/SignupFormSlice';
import { RootState } from 'src/redux/Store';
import { H3, Input, SizableText } from 'tamagui';

export default function EnterCode() {
    const { confirmCode, isLoading, error } = useConfirmEmailVerificationCode(onSuccess);
    const dispatch = useDispatch();
    const signupForm = useSelector((state: RootState) => state.signupForm);
    const router = useRouter();
    const [code, setCode] = useState<string>('');

    function onSuccess() {
        dispatch(updateCodeVerified());
        router.push('/signup/EnterAccountInfo');
    }

    return (
        <ScreenViewWithKeyboard>
            <H3>Enter code sent to email</H3>
            <Input
                marginTop='$space.6'
                placeholder='Confirmation Code'
                onChangeText={setCode}
                size='$5'
                marginBottom='$space.4'
            />
            {signupForm.isCodeVerified ? (
                <>
                    <SizableText>Email is already verified</SizableText>
                    <Link href='/signup/EnterAccountInfo' asChild>
                        <Button
                            backgroundColor='$blue6'
                            color='$blue10'
                            disabled={!code || isLoading}
                        >
                            Next
                        </Button>
                    </Link>
                </>
            ) : (
                <Button
                    onPress={() => confirmCode({ code, email: signupForm.email })}
                    backgroundColor='$blue6'
                    color='$blue10'
                    disabled={!code || isLoading}
                >
                    Next
                </Button>
            )}
            {error && (
                <SizableText textAlign='center' color='$red10'>
                    {error.message}
                </SizableText>
            )}
        </ScreenViewWithKeyboard>
    );
}
