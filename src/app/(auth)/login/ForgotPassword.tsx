import React, { useState } from 'react';
import { useForgotPassword } from 'src/api/hooks';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { H3, Input, SizableText, Spinner } from 'tamagui';

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const { forgotPassword, isPending, error } = useForgotPassword(() => {
        setBtnDisabled(true);
        setShowSuccessMessage(true);
    });

    return (
        <ScreenViewWithKeyboard>
            <H3 marginBottom='$space.2'>Forgot your Password?</H3>
            <SizableText>
                Enter your email below and we will send you reset instructions.
            </SizableText>
            <Input
                marginTop='$space.6'
                placeholder='Email'
                onChangeText={setEmail}
                size='$5'
                inputMode='email'
                autoCapitalize='none'
                marginBottom='$space.4'
            />
            <Button
                onPress={() => {
                    setShowSuccessMessage(false);
                    forgotPassword({ email });
                }}
                backgroundColor='$blue6'
                color='$blue10'
                disabled={!email || isPending || btnDisabled}
            >
                {isPending ? <Spinner /> : 'Send Email'}
            </Button>
            {error && (
                <SizableText textAlign='center' color='$red10'>
                    {error.message}
                </SizableText>
            )}
            {showSuccessMessage && (
                <SizableText>
                    If an account exists with that email, you will receive an email with reset
                    instructions.
                </SizableText>
            )}
        </ScreenViewWithKeyboard>
    );
}
