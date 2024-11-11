import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { H3, Input, SizableText, useTheme, View } from 'tamagui';

export default function EnterEmail() {
    const [email, setEmail] = useState<string>('');

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
                <Link href='/signup/EnterCode' asChild>
                    <Button backgroundColor='$blue6' color='$blue10'>
                        Next
                    </Button>
                </Link>
            </View>
        </ScreenViewWithKeyboard>
    );
}
