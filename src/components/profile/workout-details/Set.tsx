import React from 'react';
import { WorkoutSetResponseDto } from 'src/api/generated';
import { SizableText, XStack } from 'tamagui';

interface Props {
    set: WorkoutSetResponseDto;
}

export default function Set({ set }: Props) {
    return (
        <XStack gap='$space.4' width='80%'>
            <SizableText size='$5' textAlign='center' flex={1}>
                {set.order}
            </SizableText>
            <SizableText size='$5' textAlign='center' flex={1}>
                {set.weight}
            </SizableText>
            <SizableText size='$5' textAlign='center' flex={1}>
                {set.reps}
            </SizableText>
            <SizableText size='$5' textAlign='center' flex={1}>
                {set.rpe}
            </SizableText>
        </XStack>
    );
}
