import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Link } from 'expo-router';
import React from 'react';
import { Button } from 'src/components/common/button';
import ScreenViewWithKeyboard from 'src/components/common/screen-view-with-keyboard/ScreenViewWithKeyboard';
import { H3, H4, Input, useTheme, YStack } from 'tamagui';

export default function EnterAccountInfo() {
    const theme = useTheme();
    return (
        <ScreenViewWithKeyboard>
            <H3>Add your account info</H3>
            <YStack gap='$space.4' marginTop='$space.4'>
                <Input
                    placeholder='First Name'
                    onChangeText={() => {}}
                    size='$5'
                    inputMode='text'
                />
                <Input placeholder='Last Name' onChangeText={() => {}} size='$5' inputMode='text' />
            </YStack>
            <H4 marginTop='$space.3' textAlign='center'>
                Select Your Birthday
            </H4>
            <RNDateTimePicker
                value={new Date()}
                maximumDate={new Date()}
                display='spinner'
                textColor={theme.gray12.val}
                onChange={(event, date) => {
                    console.log(date);
                }}
            />
            <Link href='/signup/EnterUsernameAndPassword' asChild>
                <Button backgroundColor='$blue6' color='$blue10'>
                    Next
                </Button>
            </Link>
        </ScreenViewWithKeyboard>
    );
}
