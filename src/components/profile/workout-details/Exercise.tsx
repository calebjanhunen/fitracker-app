import React from 'react';

import { FlatList } from 'react-native-gesture-handler';

import { IWorkoutExerciseResponse } from 'src/api/workout-service/responses/IWorkoutResponse';
import { H4, SizableText, View, XStack } from 'tamagui';

interface Props {
    exercise: IWorkoutExerciseResponse;
}

export default function Exercise({ exercise }: Props) {
    return (
        <View>
            <H4 color='$blue10'>{exercise.name}</H4>
            <XStack gap='$space.4' width='80%'>
                <SizableText size='$5' fontWeight='bold' textAlign='center' flex={1}>
                    Set
                </SizableText>
                <SizableText size='$5' fontWeight='bold' textAlign='center' flex={1}>
                    Weight
                </SizableText>
                <SizableText size='$5' fontWeight='bold' textAlign='center' flex={1}>
                    Reps
                </SizableText>
                <SizableText size='$5' fontWeight='bold' textAlign='center' flex={1}>
                    RPE
                </SizableText>
            </XStack>
            <FlatList
                data={exercise.sets}
                renderItem={({ item }) => (
                    <XStack gap='$space.4' width='80%'>
                        <SizableText size='$5' textAlign='center' flex={1}>
                            {item.order}
                        </SizableText>
                        <SizableText size='$5' textAlign='center' flex={1}>
                            {item.weight}
                        </SizableText>
                        <SizableText size='$5' textAlign='center' flex={1}>
                            {item.reps}
                        </SizableText>
                        <SizableText size='$5' textAlign='center' flex={1}>
                            {item.rpe}
                        </SizableText>
                    </XStack>
                )}
            />
        </View>
    );
}
