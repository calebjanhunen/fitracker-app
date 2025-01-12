import React, { useCallback, useState } from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from 'expo-router';
import * as Progress from 'react-native-progress';
import { UserProfileDto } from 'src/api/generated';
import { Circle, H3, SizableText, useTheme, View } from 'tamagui';

interface Props {
    user: UserProfileDto;
}

// Keep in case new profile header is ugly
export default function ProfileHeader({ user }: Props) {
    const [progress, setProgress] = useState(0);
    const theme = useTheme();
    const { currentXp, xpNeededForCurrentLevel } = user;
    useFocusEffect(
        useCallback(() => {
            setProgress(user.currentXp / user.xpNeededForCurrentLevel);

            return () => {
                setProgress(0);
            };
        }, [currentXp, xpNeededForCurrentLevel])
    );

    return (
        <View alignItems='center' marginBottom='$space.5'>
            <View position='relative' alignItems='center' justifyContent='center'>
                <Circle
                    backgroundColor='$blue10'
                    size={35}
                    position='absolute'
                    bottom={0}
                    right={0}
                    borderWidth={1}
                    borderColor='$gray12'
                    zIndex={1}
                >
                    <SizableText color='$gray1' fontWeight='bold' size='$6'>
                        {user.level}
                    </SizableText>
                </Circle>
                <Progress.Circle
                    size={115}
                    progress={progress}
                    thickness={8}
                    borderWidth={0}
                    strokeCap='round'
                    color={theme.blue10.val}
                    unfilledColor={theme.background.val}
                />
                <Circle size={100} backgroundColor='$gray8' position='absolute'>
                    <IonIcons name='person-outline' size={70} />
                </Circle>
            </View>
            <H3 paddingTop='$space.2'>
                {user.firstName} {user.lastName}
            </H3>
        </View>
    );
}
