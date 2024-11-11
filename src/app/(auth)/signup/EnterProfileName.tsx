import { Link } from 'expo-router';
import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'src/components/common/button';
import { H3, Input, SizableText, View } from 'tamagui';

export default function EnterProfileName() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View flex={1} paddingHorizontal='$space.5' backgroundColor='$background'>
                <H3>Add your name</H3>
                <SizableText color='$gray10'>
                    Add your name to be displayed on your profile
                </SizableText>
                <Input
                    marginTop='$space.6'
                    placeholder='Profile Name'
                    onChangeText={() => {}}
                    size='$5'
                    inputMode='text'
                    marginBottom='$space.4'
                />
                <Link href='/signup/EnterProfileName' asChild>
                    <Button backgroundColor='$blue6' color='$blue10'>
                        Next
                    </Button>
                </Link>
            </View>
        </TouchableWithoutFeedback>
    );
}
