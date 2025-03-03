import React, { useState } from 'react';
import { Alert } from 'react-native';
import { IErrorResponse } from 'src/api/client';
import { BodyPartDto, EquipmentDto, ExerciseResponseDto } from 'src/api/generated';
import { useGetEquipmentAndBodyParts, useUpdateExercise } from 'src/api/hooks';
import { Dropdown } from 'src/components/common';
import { Button } from 'src/components/common/buttons';
import { Input, SizableText, Spinner, YStack } from 'tamagui';

interface Props {
    exerciseToEdit: ExerciseResponseDto;
    closeModal: () => void;
}

export default function EditExerciseForm({ exerciseToEdit, closeModal }: Props) {
    const { bodyParts, equipment } = useGetEquipmentAndBodyParts();
    const [name, setName] = useState(exerciseToEdit.name);
    const { updateExercise, isPending } = useUpdateExercise(closeModal, onUpdateExerciseError);
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPartDto | null>(
        bodyParts.find((bp) => bp.name === exerciseToEdit.bodyPart) ?? null
    );
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentDto | null>(
        equipment.find((eq) => eq.name === exerciseToEdit.equipment) ?? null
    );

    function onSaveButtonPress() {
        if (!selectedBodyPart || !selectedEquipment) {
            return;
        }

        updateExercise({
            id: exerciseToEdit.id,
            request: {
                name,
                bodyPartId: selectedBodyPart?.id,
                equipmentId: selectedEquipment?.id,
            },
        });
    }

    function onUpdateExerciseError(e: IErrorResponse) {
        Alert.alert('Error', `Failed to update exercise: ${e.message}`);
    }

    // TODO: Implement a safe way to edit body part and equipment without affecting exercise variations?
    return (
        <YStack gap='$space.3'>
            <YStack>
                <SizableText color='$gray10'>Name</SizableText>
                <Input value={name} onChangeText={setName} />
            </YStack>
            <YStack>
                <SizableText color='$gray10'>Body Part</SizableText>
                <Dropdown
                    isDisabled
                    selectedValue={selectedBodyPart}
                    setSelectedValue={setSelectedBodyPart}
                    data={bodyParts}
                    placeholder=''
                />
            </YStack>
            <YStack>
                <SizableText color='$gray10'>Equipment</SizableText>
                <Dropdown
                    isDisabled
                    selectedValue={selectedEquipment}
                    setSelectedValue={setSelectedEquipment}
                    data={equipment}
                    placeholder=''
                />
            </YStack>
            <SizableText color='$gray10' lineHeight={18}>
                Cannot edit body part or equipment after an exercise has been created
            </SizableText>
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
