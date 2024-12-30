import React from 'react';

import { FlatList } from 'react-native-gesture-handler';

import { WorkoutExerciseResponseDto } from 'src/api/generated';
import { H4, SizableText, View, XStack } from 'tamagui';
import Set from './Set';

interface Props {
    exercise: WorkoutExerciseResponseDto;
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
            <FlatList data={exercise.sets} renderItem={({ item }) => <Set set={item} />} />
        </View>
    );
}
