import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { IUser } from 'src/redux/user/IUser';
import { Circle, H3, H4, H5, H6, SizableText, View, XStack, YStack } from 'tamagui';

interface Props {
    user: IUser;
}

export default function ProfileHeaderV2({ user }: Props) {
    return (
        <View marginBottom='$space.5'>
            <XStack gap='$space.5'>
                <Circle size={100} backgroundColor='$gray8'>
                    <IonIcons name='person-outline' size={70} />
                </Circle>
                <YStack gap='$space.0'>
                    <H3>
                        {user.firstName} {user.lastName}
                    </H3>
                    <SizableText marginTop='$space.-2' color='$gray10'>
                        @{user.username}
                    </SizableText>
                </YStack>
            </XStack>
        </View>
    );
}
