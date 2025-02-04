import React, { useState } from 'react';
import { ExerciseResponseDto } from 'src/api/generated';
import { SizableText, YStack } from 'tamagui';
import ExerciseDetailsModal from './ExerciseDetailsModal/ExerciseDetailsModal';

interface Props {
    exercise: ExerciseResponseDto;
    index: number;
}
export default function ExerciseListItem({ exercise, index }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseResponseDto | null>(null);

    function onExercisePress() {
        setSelectedExercise(exercise);
        setIsModalOpen(true);
    }

    return (
        <>
            <ExerciseDetailsModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                exercise={selectedExercise}
            />
            <YStack
                paddingVertical='$space.2'
                gap='$space.1'
                borderTopColor='$gray8'
                borderTopWidth={index === 0 ? 1 : 0}
                borderBottomColor='$gray8'
                borderBottomWidth={1}
                onPress={onExercisePress}
            >
                <SizableText size='$5' fontWeight='bold'>
                    {exercise.name} ({exercise.equipment})
                </SizableText>
                <SizableText color='$gray10'>{exercise.bodyPart}</SizableText>
            </YStack>
        </>
    );
}
