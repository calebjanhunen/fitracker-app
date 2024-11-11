import { Link } from 'expo-router';
import React from 'react';
import { Keyboard, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'src/components/common/button';
import { H3, Input, SizableText, useTheme, View, XStack, YStack } from 'tamagui';

export default function EnterCode() {
    const theme = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View flex={1} paddingHorizontal='$space.5'>
                    <YStack flex={1} justifyContent='space-between'>
                        <View>
                            <H3>Enter code sent to email</H3>
                            <TouchableOpacity onPress={() => {}}>
                                <SizableText fontWeight='bold' color='$blue10'>
                                    Send code again
                                </SizableText>
                            </TouchableOpacity>
                            <Input
                                marginTop='$space.6'
                                placeholder='Confirmation Code'
                                onChangeText={() => {}}
                                size='$5'
                                inputMode='numeric'
                                marginBottom='$space.4'
                            />
                            <Link href='/signup/EnterCode' asChild>
                                <Button>Next</Button>
                            </Link>
                        </View>
                        <XStack alignItems='center' justifyContent='center' gap='$2'>
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
