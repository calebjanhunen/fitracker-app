import React, { useEffect, useMemo, useState } from 'react';
import { ExerciseResponseDto, LookupItemDto } from 'src/api/generated';
import { useGetAllExercises, useGetCableAttachments } from 'src/api/hooks';
import { Dropdown } from 'src/components/common';
import { Button } from 'src/components/common/buttons';
import { Input, SizableText, View, YStack } from 'tamagui';

export default function CreateExerciseVariationForm() {
    const [selectedParentExercise, setSelectedParentExercise] =
        useState<ExerciseResponseDto | null>(null);
    const [selectedCableAttachment, setSelectedCableAttachment] = useState<LookupItemDto | null>(
        null
    );
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [isCreateBtnDisabled, setIsCreateBtnDisabled] = useState(true);
    const { data: exercises } = useGetAllExercises();
    const { cableAttachments } = useGetCableAttachments();

    useEffect(() => {
        if (selectedParentExercise && name) {
            setIsCreateBtnDisabled(false);
        } else {
            setIsCreateBtnDisabled(true);
        }
    }, [selectedParentExercise, name]);

    // Reset selected cable attachment if non cable parent exercise is selected
    useEffect(() => {
        if (selectedParentExercise?.equipment !== 'Cable') {
            setSelectedCableAttachment(null);
        }
    }, [selectedParentExercise]);

    const exerciseOptions = useMemo(() => {
        if (!exercises) return [];

        return exercises.map((e) => ({ ...e, name: `${e.name} (${e.equipment})` }));
    }, [exercises]);

    return (
        <View>
            <YStack gap='$space.2'>
                <SizableText>* = Required</SizableText>
                <Dropdown
                    selectedValue={selectedParentExercise}
                    setSelectedValue={setSelectedParentExercise}
                    data={exerciseOptions}
                    placeholder='* Select Parent Exercise'
                />
                {selectedParentExercise?.equipment === 'Cable' && (
                    <Dropdown
                        selectedValue={selectedCableAttachment}
                        setSelectedValue={setSelectedCableAttachment}
                        data={cableAttachments}
                        placeholder='Select Cable Attachment'
                    />
                )}
                <Input placeholder='* Name' value={name} onChangeText={setName} />
                <Input placeholder='Notes' value={notes} onChangeText={setNotes} />
                <Button backgroundColor='$blue10' color='$gray1' disabled={isCreateBtnDisabled}>
                    Create
                </Button>
            </YStack>
        </View>
    );
}
