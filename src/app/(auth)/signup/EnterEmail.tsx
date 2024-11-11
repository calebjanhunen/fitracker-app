import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'src/components/common/button';
import { H3, Input, SizableText, useTheme, View, XStack, YStack } from 'tamagui';

export default function EnterEmail() {
    const theme = useTheme();
    const [email, setEmail] = useState<string>('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View flex={1} paddingHorizontal='$space.5' paddingTop='$space.4'>
                    <YStack flex={1} justifyContent='space-between'>
                        <View>
                            <H3>Enter email address</H3>
                            <SizableText>
                                This will be the email for your account and what Fitracker will use
                                to contact you. No one will see this on your profile.
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
                            <Link href='/signup/EnterCode' asChild>
                                <Button>Next</Button>
                            </Link>
                        </View>
                        <XStack
                            alignItems='center'
                            justifyContent='center'
                            gap='$2'
                            paddingBottom='$space.5'
                        >
                            <SizableText>Already have an account?</SizableText>
                            <Link
                                push
                                href='/(auth)/login'
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Login
                            </Link>
                        </XStack>
                    </YStack>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
