import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { IErrorResponse } from 'src/api/client';
import { ExerciseResponseDto, ExerciseVariationDto, LookupItemDto } from 'src/api/generated';
import {
    useCreateExerciseVariation,
    useGetAllExercises,
    useGetCableAttachments,
} from 'src/api/hooks';
import { Dropdown } from 'src/components/common';
import { Button } from 'src/components/common/buttons';
import { Input, SizableText, View, YStack } from 'tamagui';

interface Props {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    onSuccess?: (exerciseId: string) => void;
}

export default function CreateExerciseVariationForm({ setIsModalOpen, onSuccess }: Props) {
    const { data: exercises } = useGetAllExercises();
    const { cableAttachments } = useGetCableAttachments();
    const { createExerciseVariation, isPending } = useCreateExerciseVariation(
        onCreateSuccess,
        onCreateError
    );
    const [selectedParentExercise, setSelectedParentExercise] =
        useState<ExerciseResponseDto | null>(null);
    const [selectedCableAttachment, setSelectedCableAttachment] = useState<LookupItemDto | null>(
        null
    );
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [isCreateBtnDisabled, setIsCreateBtnDisabled] = useState(true);

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

        return exercises
            .filter((e) => e.exerciseType === 'exercise')
            .map((e) => ({ ...e, name: `${e.name} (${e.equipment})` }));
    }, [exercises]);

    function onCreateButtonPress() {
        if (!name || !selectedParentExercise) {
            return;
        }

        const createVariationDto = {
            name,
            notes: notes ?? undefined,
            cableAttachmentId: selectedCableAttachment?.id ?? undefined,
        };

        createExerciseVariation({
            parentExerciseId: selectedParentExercise.id,
            dto: createVariationDto, // TODO: Set as optional in backend and update frontend
        });
    }

    function onCreateSuccess(exercise: ExerciseVariationDto) {
        setIsModalOpen(false);
        onSuccess?.(exercise.id);
    }

    function onCreateError(error: IErrorResponse) {
        Alert.alert('Failed to create exercise', `${error.message} (${error.statusCode})`);
    }

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
                        isOptional
                    />
                )}
                <Input placeholder='* Name' value={name} onChangeText={setName} />
                <Input placeholder='Notes' value={notes} onChangeText={setNotes} />
                <Button
                    marginTop='$space.7'
                    backgroundColor='$green8'
                    color='$gray1'
                    disabled={isCreateBtnDisabled}
                    onPress={onCreateButtonPress}
                >
                    {isPending ? <ActivityIndicator /> : 'Create'}
                </Button>
            </YStack>
        </View>
    );
}
