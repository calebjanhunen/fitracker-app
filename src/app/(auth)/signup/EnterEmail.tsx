import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useVerifyEmail } from 'src/api/hooks';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { updateEmail } from 'src/redux/signup-form/SignupFormSlice';
import { H3, Input, SizableText, Spinner, View } from 'tamagui';

export default function EnterEmail() {
    const [email, setEmail] = useState<string>('');
    const dispatch = useDispatch();
    const router = useRouter();
    const { sendCode, isLoading, error } = useVerifyEmail(onSendCodeSuccess);

    function onSendCodeSuccess() {
        dispatch(updateEmail(email));
        router.push('/signup/EnterCode');
    }

    return (
        <ScreenViewWithKeyboard>
            <View>
                <H3>Enter email address</H3>
                <SizableText color='$gray10'>
                    This will be the email for your account and what Fitracker will use to contact
                    you. No one will see this on your profile.
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
                    onPress={() => sendCode({ email })}
                    backgroundColor='$blue6'
                    color='$blue10'
                    disabled={!email || isLoading}
                >
                    {isLoading ? <Spinner /> : 'Next'}
                </Button>
                {error && (
                    <SizableText textAlign='center' color='$red10'>
                        {error.message}
                    </SizableText>
                )}
            </View>
        </ScreenViewWithKeyboard>
    );
}
