import React, { useEffect, useState } from 'react';
import { BodyPartDto, EquipmentDto } from 'src/api/generated';
import { useGetEquipmentAndBodyParts } from 'src/api/hooks';
import { Dropdown } from 'src/components/common';
import { Button } from 'src/components/common/buttons';
import { Input, YStack } from 'tamagui';

export default function CreateExerciseForm() {
    const { bodyParts, equipment } = useGetEquipmentAndBodyParts();
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPartDto | null>(null);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentDto | null>(null);
    const [name, setName] = useState('');
    const [isCreateBtnDisabled, setIsCreateBtnDisabled] = useState(true);

    useEffect(() => {
        if (selectedBodyPart && selectedEquipment && name) {
            setIsCreateBtnDisabled(false);
        } else {
            setIsCreateBtnDisabled(true);
        }
    }, [selectedBodyPart, selectedEquipment, name]);

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
            >
                Create
            </Button>
        </YStack>
    );
}
