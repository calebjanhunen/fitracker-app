import { Link } from 'expo-router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { updateAccountInfo } from 'src/redux/signup-form/SignupFormSlice';
import { H3, Input, YStack } from 'tamagui';

export default function EnterAccountInfo() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const dispatch = useDispatch();

    function onNextBtnPress() {
        dispatch(updateAccountInfo({ firstName, lastName }));
    }

    return (
        <ScreenViewWithKeyboard>
            <H3>Add your account info</H3>
            <YStack gap='$space.4' marginTop='$space.6' marginBottom='$space.4'>
                <Input
                    placeholder='First Name'
                    onChangeText={setFirstName}
                    size='$5'
                    inputMode='text'
                />
                <Input
                    placeholder='Last Name'
                    onChangeText={setLastName}
                    size='$5'
                    inputMode='text'
                />
            </YStack>
            <Link href='/signup/EnterUsernameAndPassword' asChild>
                <Button
                    onPress={onNextBtnPress}
                    backgroundColor='$blue6'
                    color='$blue10'
                    disabled={!firstName || !lastName}
                >
                    Next
                </Button>
            </Link>
        </ScreenViewWithKeyboard>
    );
}
