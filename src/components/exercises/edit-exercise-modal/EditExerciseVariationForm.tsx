import React, { useState } from 'react';
import { Alert } from 'react-native';
import { IErrorResponse } from 'src/api/client';
import { ExerciseDetailsDto, ExerciseResponseDto } from 'src/api/generated';
import { useUpdateExerciseVariation } from 'src/api/hooks';
import { Button } from 'src/components/common/buttons';
import { Input, SizableText, Spinner, YStack } from 'tamagui';

interface Props {
    exerciseVariationToEdit: ExerciseDetailsDto;
    onUpdateSuccess: (exercise: ExerciseResponseDto) => void;
}

export default function EditExerciseVariationForm({
    exerciseVariationToEdit,
    onUpdateSuccess,
}: Props) {
    const [name, setName] = useState(exerciseVariationToEdit.name);
    const [notes, setNotes] = useState(exerciseVariationToEdit.notes);
    const { updateExerciseVariation, isPending } = useUpdateExerciseVariation(
        onUpdateSuccess,
        onUpdateExerciseVariationError
    );

    function onSaveButtonPress() {
        if (!name) {
            return;
        }

        updateExerciseVariation({
            exerciseVariationId: exerciseVariationToEdit.id,
            request: {
                name,
                notes: notes ?? undefined,
            },
        });
    }

    function onUpdateExerciseVariationError(e: IErrorResponse) {
        Alert.alert('Error', `Failed to update exercise: ${e.message}`);
    }

    return (
        <YStack gap='$space.3'>
            <YStack>
                <SizableText color='$gray10'>Name</SizableText>
                <Input value={name} onChangeText={setName} />
            </YStack>
            <YStack>
                <SizableText color='$gray10'>Notes</SizableText>
                <Input value={notes} onChangeText={setNotes} />
            </YStack>
            <Button
                disabled={isPending}
                backgroundColor='$blue7'
                color='$blue10'
                onPress={onSaveButtonPress}
            >
                {isPending ? <Spinner /> : 'Save'}
            </Button>
        </YStack>
    );
}
