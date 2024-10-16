import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { formatDate, formatTime, formatWorkoutDuration } from 'src/utils';
import { SizableText, XStack } from 'tamagui';

interface Props {
    createdAt: string;
    duration: number;
}

export default function TimeAndDateInfo({ createdAt, duration }: Props) {
    return (
        <XStack gap='$space.5' paddingTop='$space.4'>
            <XStack alignItems='center' gap='$space.2'>
                <IonIcons name='calendar-outline' size={18} />
                <SizableText color='$gray10' size='$4'>
                    {formatTime(createdAt)}
                </SizableText>
                <SizableText color='$gray10' size='$4'>
                    {formatDate(createdAt)}
                </SizableText>
            </XStack>
            <XStack alignItems='center' gap='$space.2'>
                <IonIcons name='time-outline' size={18} />
                <SizableText color='$gray10' size='$4'>
                    {formatWorkoutDuration(duration)}
                </SizableText>
            </XStack>
        </XStack>
    );
}
