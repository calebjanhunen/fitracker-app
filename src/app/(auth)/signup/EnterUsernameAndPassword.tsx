import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { useSignup } from 'src/hooks/auth/useSignup';
import { RootState } from 'src/redux/Store';
import { H3, Input, ScrollView, SizableText, Spinner, View, XStack, YStack } from 'tamagui';

export default function EnterUsernameAndPassword() {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [dispPasswordReq, setDispPasswordReq] = useState<boolean>(false);
    const { signup, isLoading, error: signupError } = useSignup(onSignupSuccess);
    const router = useRouter();
    const signupForm = useSelector((state: RootState) => state.signupForm);

    async function onSignupSuccess() {
        router.replace('/workout-tracker');
    }

    function onSignupPress() {
        signup({ ...signupForm, username, password, confirmPassword });
    }

    return (
        <ScreenViewWithKeyboard>
            <H3>Create your username and password</H3>
            <ScrollView>
                <YStack gap='$space.4' marginTop='$space.6' marginBottom='$space.4'>
                    <Input
                        placeholder='Username'
                        onChangeText={setUserName}
                        size='$5'
                        inputMode='text'
                        autoCapitalize='none'
                    />
                    <Input
                        onFocus={() => {
                            console.log('display');
                            setDispPasswordReq(true);
                        }}
                        onBlur={() => setDispPasswordReq(false)}
                        placeholder='Password'
                        onChangeText={setPassword}
                        size='$5'
                        secureTextEntry
                        inputMode='text'
                        textContentType='newPassword'
                        passwordRules='minLength: 8; required: upper; required: lower; required: digit; required: [-@.#$%^&*()_+];'
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    {dispPasswordReq && <PasswordRequirementDisplay password={password} />}
                    <Input
                        placeholder='Confirm Password'
                        onChangeText={setConfirmPassword}
                        size='$5'
                        secureTextEntry
                        inputMode='text'
                        autoCorrect={false}
                        autoCapitalize='none'
                        textContentType='newPassword'
                    />
                </YStack>
                <Button
                    onPress={onSignupPress}
                    backgroundColor='$blue6'
                    color='$blue10'
                    marginBottom='$space.3'
                    disabled={!username || !password || !confirmPassword || isLoading}
                >
                    {isLoading ? <Spinner /> : 'Create Account'}
                </Button>
                {signupError && (
                    <SizableText color='$red10' textAlign='center'>
                        {signupError.message}
                    </SizableText>
                )}
            </ScrollView>
        </ScreenViewWithKeyboard>
    );
}
function PasswordRequirementDisplay({ password }: { password: string }) {
    return (
        <View paddingLeft='$space.3'>
            <SizableText>Password must contain at least...</SizableText>
            <XStack gap='$space.3' justifyContent='space-between' paddingHorizontal='$space.1'>
                <YStack>
                    <XStack alignItems='center' gap='$space.2'>
                        <SizableText size='$2' color={password.length > 7 ? '$green10' : '$gray12'}>
                            {'\u2022'} 8 characters
                        </SizableText>
                    </XStack>
                    <XStack alignItems='center' gap='$space.2'>
                        <SizableText
                            size='$2'
                            color={/[A-Z]/.test(password) ? '$green10' : '$gray12'}
                        >
                            {'\u2022'} One uppercase letter
                        </SizableText>
                    </XStack>
                    <XStack alignItems='center' gap='$space.2'>
                        <SizableText
                            size='$2'
                            color={/[a-z]/.test(password) ? '$green10' : '$gray12'}
                        >
                            {'\u2022'} One lowercase letter
                        </SizableText>
                    </XStack>
                </YStack>
                <YStack>
                    <XStack alignItems='center' gap='$space.2'>
                        <SizableText
                            size='$2'
                            color={/[0-9]/.test(password) ? '$green10' : '$gray12'}
                        >
                            {'\u2022'} One number
                        </SizableText>
                    </XStack>
                    <XStack alignItems='center' gap='$space.2'>
                        <SizableText
                            size='$2'
                            color={/[^a-zA-Z0-9]/.test(password) ? '$green10' : '$gray12'}
                        >
                            {'\u2022'} One special character
                        </SizableText>
                    </XStack>
                </YStack>
            </XStack>
        </View>
    );
}
