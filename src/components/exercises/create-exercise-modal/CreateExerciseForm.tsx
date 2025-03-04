import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { IErrorResponse } from 'src/api/client';
import { BodyPartDto, EquipmentDto, ExerciseResponseDto } from 'src/api/generated';
import { useCreateExercise, useGetEquipmentAndBodyParts } from 'src/api/hooks';
import { Dropdown } from 'src/components/common';
import { Button } from 'src/components/common/buttons';
import { Input, YStack } from 'tamagui';

interface Props {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    onSuccess?: (id: string) => void;
}

export default function CreateExerciseForm({ setIsModalOpen, onSuccess }: Props) {
    const { bodyParts, equipment } = useGetEquipmentAndBodyParts();
    const { createExercise, isPending } = useCreateExercise(onCreateSuccess, onCreateError);
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPartDto | null>(null);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentDto | null>(null);
    const [name, setName] = useState('');

    const isCreateBtnDisabled = useMemo(() => {
        if (isPending) {
            return true;
        }

        if (selectedBodyPart && selectedEquipment && name) {
            return false;
        }
        return true;
    }, [isPending, selectedBodyPart, selectedEquipment, name]);

    function onCreateButtonPress() {
        if (!name || !selectedBodyPart || !selectedEquipment) {
            return;
        }

        createExercise({
            name,
            bodyPartId: selectedBodyPart.id,
            equipmentId: selectedEquipment.id,
        });
    }

    function onCreateSuccess(exercise: ExerciseResponseDto) {
        setIsModalOpen(false);
        onSuccess?.(exercise.id);
    }

    function onCreateError(error: IErrorResponse) {
        Alert.alert('Failed to create exercise', `${error.message} (${error.statusCode})`);
    }

    return (
        <YStack justifyContent='space-between'>
            <YStack gap='$space.2'>
                <Input placeholder='* Name' value={name} onChangeText={setName} />
                <Dropdown
                    selectedValue={selectedBodyPart}
                    setSelectedValue={setSelectedBodyPart}
                    data={bodyParts}
                    placeholder='* Select Body Part'
                />
                <Dropdown
                    data={equipment}
                    selectedValue={selectedEquipment}
                    setSelectedValue={setSelectedEquipment}
                    placeholder='* Select Equipment'
                />
            </YStack>
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
    );
}
