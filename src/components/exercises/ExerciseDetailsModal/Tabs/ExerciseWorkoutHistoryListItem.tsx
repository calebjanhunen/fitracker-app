import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ExerciseWorkoutHistoryDto } from 'src/api/generated';
import { formatDate, formatWorkoutDuration } from 'src/utils';
import { Card, SizableText, XStack } from 'tamagui';

interface Props {
    workoutHistory: ExerciseWorkoutHistoryDto;
}

export default function ExerciseWorkoutHistoryListItem({ workoutHistory }: Props) {
    return (
        <Card>
            <Card.Header bordered borderRadius='$radius.5'>
                <XStack alignItems='center' justifyContent='space-between'>
                    <SizableText size='$5' fontWeight='bold'>
                        {workoutHistory.name}
                    </SizableText>
                </XStack>
                <XStack gap='$space.4'>
                    <XStack alignItems='center' gap='$space.2'>
                        <IonIcons name='calendar-outline' size={15} />
                        <SizableText color='$gray10'>
                            {formatDate(workoutHistory.createdAt.toString())}
                        </SizableText>
                    </XStack>
                    <XStack alignItems='center' gap='$space.2'>
                        <IonIcons name='time-outline' size={15} />
                        <SizableText color='$gray10'>
                            {formatWorkoutDuration(workoutHistory.duration)}
                        </SizableText>
                    </XStack>
                </XStack>
                <SizableText size='$5' fontWeight='bold'>
                    Sets
                </SizableText>
                <FlatList
                    data={workoutHistory.sets}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <XStack width='50%'>
                            <SizableText flex={0.2}>{index + 1}</SizableText>
                            <SizableText flex={1}>
                                {item.weight} lbs x {item.reps} {item.rpe ? `@ ${item.rpe}` : ''}
                            </SizableText>
                        </XStack>
                    )}
                />
            </Card.Header>
        </Card>
    );
}
