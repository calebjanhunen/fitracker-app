import { Link } from 'expo-router';
import React from 'react';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { Button, H3, Input, YStack } from 'tamagui';

export default function EnterUsernameAndPassword() {
    return (
        <ScreenViewWithKeyboard>
            <H3>Create your username and password</H3>
            <YStack gap='$space.4' marginTop='$space.6' marginBottom='$space.5'>
                <Input placeholder='Username' onChangeText={() => {}} size='$5' inputMode='text' />
                <Input placeholder='Password' onChangeText={() => {}} size='$5' inputMode='text' />
                <Input
                    placeholder='Confirm Password'
                    onChangeText={() => {}}
                    size='$5'
                    inputMode='text'
                />
            </YStack>
            <Link href='/signup/EnterLoginInfo' asChild>
                <Button backgroundColor='$blue6' color='$blue10'>
                    Create Account
                </Button>
            </Link>
        </ScreenViewWithKeyboard>
    );
}
