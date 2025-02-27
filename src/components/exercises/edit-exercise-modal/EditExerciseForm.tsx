import React, { useState } from 'react';
import { BodyPartDto, EquipmentDto, ExerciseResponseDto } from 'src/api/generated';
import { useGetEquipmentAndBodyParts } from 'src/api/hooks';
import { Dropdown } from 'src/components/common';
import { Button } from 'src/components/common/buttons';
import { Input, SizableText, YStack } from 'tamagui';

interface Props {
    exerciseToEdit: ExerciseResponseDto;
}

export default function EditExerciseForm({ exerciseToEdit }: Props) {
    const { bodyParts, equipment } = useGetEquipmentAndBodyParts();
    const [name, setName] = useState(exerciseToEdit.name);
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPartDto | null>(
        bodyParts.find((bp) => bp.name === exerciseToEdit.bodyPart) ?? null
    );
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentDto | null>(
        equipment.find((eq) => eq.name === exerciseToEdit.equipment) ?? null
    );

    function onSaveButtonPress() {
        console.log(name);
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
            <Button backgroundColor='$blue7' color='$blue10' onPress={onSaveButtonPress}>
                Save
            </Button>
        </YStack>
    );
}
