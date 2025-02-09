import React, { useEffect, useMemo, useState } from 'react';
import { useGetAllExercises, useGetCableAttachments } from 'src/api/hooks';
import { Button } from 'src/components/common/buttons';
import DropdownMenu from 'src/components/common/DropdownMenu';
import { Input, SizableText, View, YStack } from 'tamagui';

export default function CreateExerciseVariationForm() {
    const [selectedParentExercise, setSelectedParentExercise] = useState('');
    const [selectedCableAttachment, setSelectedCableAttachment] = useState('');
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

    const exerciseOptions = useMemo(() => {
        if (!exercises) return [];

        return exercises
            .filter((e) => e.exerciseType === 'exercise')
            .map((e) => ({ id: e.id, name: `${e.name} (${e.equipment})` }));
    }, [exercises]);

    return (
        <View flex={1}>
            <YStack gap='$space.4' flex={1}>
                <SizableText>* = Required</SizableText>
                <DropdownMenu
                    selectedVal={selectedParentExercise}
                    setSelectedVal={setSelectedParentExercise}
                    options={exerciseOptions}
                    placeholder='* Parent Exercise'
                    label='Exercises'
                    selectedColor='$blue8'
                />
                <Input placeholder='* Name' value={name} onChangeText={setName} />
                <Input placeholder='Notes' value={notes} onChangeText={setNotes} />
                {exercises?.find(
                    (e) => e.id === selectedParentExercise && e.equipment === 'Cable'
                ) && (
                    <DropdownMenu
                        selectedVal={selectedCableAttachment}
                        setSelectedVal={setSelectedCableAttachment}
                        options={cableAttachments}
                        placeholder='Cable Attachment'
                        label='Cable Attachments'
                        selectedColor='$blue8'
                    />
                )}
            </YStack>
            {/* <Button disabled={isCreateBtnDisabled}>Create</Button> */}
        </View>
    );
}
