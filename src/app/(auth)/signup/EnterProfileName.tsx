import { Link } from 'expo-router';
import React from 'react';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { H3, Input, SizableText } from 'tamagui';

export default function EnterProfileName() {
    return (
        <ScreenViewWithKeyboard>
            <H3>Add your name</H3>
            <SizableText color='$gray10'>Add your name to be displayed on your profile</SizableText>
            <Input
                marginTop='$space.6'
                placeholder='Profile Name'
                onChangeText={() => {}}
                size='$5'
                inputMode='text'
                marginBottom='$space.4'
            />
            <Link href='/signup/CreatePassword' asChild>
                <Button backgroundColor='$blue6' color='$blue10'>
                    Next
                </Button>
            </Link>
        </ScreenViewWithKeyboard>
    );
}
