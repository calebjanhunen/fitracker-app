import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/Store';
import { Circle, H3, H5, View, XStack } from 'tamagui';

export default function Profile() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <View flex={1} alignItems='center' marginTop='$6'>
            <Circle size={150} backgroundColor='$gray10' />
            <H3 paddingTop='$space.4'>
                {user.firstName} {user.lastName}
            </H3>
            <XStack gap='$space.2'>
                <H5>XP:</H5>
                <H5>{user.totalXp}</H5>
            </XStack>
        </View>
    );
}
