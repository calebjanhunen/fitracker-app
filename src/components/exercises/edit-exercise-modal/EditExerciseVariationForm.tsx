import React, { useState } from 'react';
import { ExerciseDetailsDto } from 'src/api/generated';
import { Button } from 'src/components/common/buttons';
import { Input, SizableText, Spinner, YStack } from 'tamagui';

interface Props {
    exerciseVariationToEdit: ExerciseDetailsDto;
}

export default function EditExerciseVariationForm({ exerciseVariationToEdit }: Props) {
    const [name, setName] = useState(exerciseVariationToEdit.name);
    const [notes, setNotes] = useState(exerciseVariationToEdit.notes);
    const isPending = false;

    function onSaveButtonPress() {}

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
