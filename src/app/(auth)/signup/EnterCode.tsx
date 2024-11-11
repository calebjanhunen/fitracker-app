import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { H3, Input, SizableText } from 'tamagui';

export default function EnterCode() {
    return (
        <ScreenViewWithKeyboard>
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
            <Link href='/signup/EnterAccountInfo' asChild>
                <Button backgroundColor='$blue6' color='$blue10'>
                    Next
                </Button>
            </Link>
        </ScreenViewWithKeyboard>
    );
}
