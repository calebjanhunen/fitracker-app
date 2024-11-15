import { Link, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { useResetPassword } from 'src/hooks/auth/useResetPassword';
import { H3, Input, SizableText, View, XStack, YStack } from 'tamagui';

export default function ResetPassword() {
    const { token } = useLocalSearchParams<{ token: string }>();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [dispPasswordReq, setDispPasswordReq] = useState<boolean>(false);
    const { resetPassword, isPending, error, isSuccess } = useResetPassword(() => {
        setPassword('');
        setConfirmPassword('');
    });

    return (
        <ScreenViewWithKeyboard>
            <YStack flex={1} justifyContent='space-between'>
                <View>
                    <H3>Reset your Password</H3>
                    <YStack gap='$space.4' marginTop='$space.6' marginBottom='$space.4'>
                        <Input
                            onFocus={() => setDispPasswordReq(true)}
                            onBlur={() => setDispPasswordReq(false)}
                            placeholder='Password'
                            value={password}
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
                            value={confirmPassword}
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
                        onPress={() => resetPassword({ password, confirmPassword, token })}
                        backgroundColor='$blue6'
                        color='$blue10'
                        marginBottom='$space.3'
                        disabled={!password || !confirmPassword || isPending}
                    >
                        Reset Password
                    </Button>
                    {error && (
                        <SizableText textAlign='center' color='$red10'>
                            {error.message}
                        </SizableText>
                    )}
                    {isSuccess && (
                        <SizableText color='$green10' textAlign='center'>
                            Password successfully reset. Go back to login to login to your account.
                        </SizableText>
                    )}
                </View>
                <Link href='/login'>
                    <SizableText textDecorationLine='underline' textAlign='center'>
                        Return to login
                    </SizableText>
                </Link>
            </YStack>
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
