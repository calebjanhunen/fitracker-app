import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { IWorkoutResponse } from 'src/api/workout-service/responses/IWorkoutResponse';
import PopoverMenu, { PopoverMenuOptions } from 'src/components/common/PopoverMenu';
import { formatDate } from 'src/utils/FormatDate';
import { formatWorkoutDuration } from 'src/utils/formatWorkoutDuration';
import { Card, H4, SizableText, useTheme, XStack } from 'tamagui';

interface Props {
    workout: IWorkoutResponse;
}

export default function WorkoutHistoryCard({ workout }: Props) {
    const theme = useTheme();
    const menuOptions: PopoverMenuOptions[] = [
        {
            text: 'Edit',
            action: () => {},
            icon: 'create-outline',
            iconColor: theme.blue10.val,
        },
        {
            text: 'Delete',
            action: () => {},
            icon: 'trash-outline',
            iconColor: theme.red10.val,
        },
    ];

    return (
        <Card>
            <Card.Header elevate bordered borderRadius='$radius.5'>
                <XStack alignItems='center' justifyContent='space-between'>
                    <H4>{workout.name}</H4>
                    <PopoverMenu menuOptions={menuOptions} />
                </XStack>
                <XStack gap='$space.4'>
                    <XStack alignItems='center' gap='$space.2'>
                        <IonIcons name='calendar-outline' size={15} />
                        <SizableText color='$gray10'>{formatDate(workout.createdAt)}</SizableText>
                    </XStack>
                    <XStack alignItems='center' gap='$space.2'>
                        <IonIcons name='time-outline' size={15} />
                        <SizableText color='$gray10'>
                            {formatWorkoutDuration(workout.duration)}
                        </SizableText>
                    </XStack>
                </XStack>
                <FlatList
                    scrollEnabled={false}
                    ListHeaderComponent={() => (
                        <SizableText fontWeight='bold'>Exercises</SizableText>
                    )}
                    data={workout.exercises}
                    renderItem={({ item }) => (
                        <XStack gap='$space.3'>
                            <SizableText>
                                {item.name} - {item.sets.length}{' '}
                                {item.sets.length === 1 ? 'Set' : 'Sets'}
                            </SizableText>
                        </XStack>
                    )}
                />
            </Card.Header>
        </Card>
    );
}
