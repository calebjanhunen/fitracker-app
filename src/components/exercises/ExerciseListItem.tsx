import React from 'react';
import { ExerciseResponseDto } from 'src/api/generated';
import { SizableText, YStack } from 'tamagui';

interface Props {
    exercise: ExerciseResponseDto;
    index: number;
}
export default function ExerciseListItem({ exercise, index }: Props) {
    return (
        <YStack
            paddingVertical='$space.2'
            gap='$space.1'
            borderTopColor='$gray8'
            borderTopWidth={index === 0 ? 1 : 0}
            borderBottomColor='$gray8'
            borderBottomWidth={1}
        >
            <SizableText size='$5' fontWeight='bold'>
                {exercise.name} ({exercise.equipment})
            </SizableText>
            <SizableText color='$gray10'>{exercise.bodyPart}</SizableText>
        </YStack>
    );
}
