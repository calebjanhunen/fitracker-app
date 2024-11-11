import { Link } from 'expo-router';
import React from 'react';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'src/components/common/button';
import { H3, Input, SizableText, View } from 'tamagui';

export default function EnterCode() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View flex={1} paddingHorizontal='$space.5' backgroundColor='$background'>
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
                <Link href='/signup/EnterProfileName' asChild>
                    <Button backgroundColor='$blue6' color='$blue10'>
                        Next
                    </Button>
                </Link>
            </View>
        </TouchableWithoutFeedback>
    );
}
