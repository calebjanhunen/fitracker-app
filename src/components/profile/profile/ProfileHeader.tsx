import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { IUserResponse } from 'src/api/user-service/interfaces/IUserResponse';
import { Circle, H3, H5, View, XStack } from 'tamagui';

interface Props {
    user: IUserResponse;
}

export default function ProfileHeader({ user }: Props) {
    return (
        <View alignItems='center'>
            <Circle size={100} backgroundColor='$gray8'>
                <IonIcons name='person-outline' size={70} />
            </Circle>
            <H3 paddingTop='$space.2'>
                {user.firstName} {user.lastName}
            </H3>
            <XStack gap='$space.2'>
                <H5>XP:</H5>
                <H5>{user.totalXp}</H5>
            </XStack>
        </View>
    );
}
