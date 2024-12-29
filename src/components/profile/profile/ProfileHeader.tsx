import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { UserProfileDto } from 'src/api/generated';
import { Circle, H3, H5, View, XStack } from 'tamagui';

interface Props {
    user: UserProfileDto;
}

export default function ProfileHeader({ user }: Props) {
    return (
        <View alignItems='center' marginBottom='$space.5'>
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
