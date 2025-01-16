import React from 'react';

import { View, XStack, YStack } from 'tamagui';

import { IUser } from 'src/redux/user/IUser';
import Avatar from './Avatar';
import LevelDisplay from './LevelDisplay';
import LevelProgressBar from './LevelProgressBar';
import UserTitle from './UserTitle';

interface Props {
    user: IUser;
}

export default function ProfileHeaderV2({ user }: Props) {
    return (
        <View marginBottom='$space.5'>
            <XStack gap='$space.3'>
                <Avatar />
                <YStack flex={1} gap='$space.3'>
                    <XStack alignItems='center' justifyContent='space-between'>
                        <UserTitle
                            username={user.username}
                            firstName={user.firstName}
                            lastName={user.lastName}
                        />
                        <LevelDisplay level={user.level} />
                    </XStack>
                    <LevelProgressBar
                        currentXp={user.currentXp}
                        xpNeededForCurrentLevel={user.xpNeededForCurrentLevel}
                    />
                </YStack>
            </XStack>
        </View>
    );
}
