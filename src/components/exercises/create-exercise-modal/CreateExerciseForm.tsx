import React, { useEffect, useState } from 'react';
import { useGetEquipmentAndBodyParts } from 'src/api/hooks';
import { Button } from 'src/components/common/buttons';
import DropdownMenu from 'src/components/common/DropdownMenu';
import { Input, YStack } from 'tamagui';

export default function CreateExerciseForm() {
    const { bodyParts, equipment } = useGetEquipmentAndBodyParts();
    const [selectedBodyPart, setSelectedBodyPart] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState('');
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
                <DropdownMenu
                    selectedVal={selectedBodyPart}
                    setSelectedVal={setSelectedBodyPart}
                    options={bodyParts}
                    placeholder='Select Body Part'
                    label='Body Parts'
                />
                <DropdownMenu
                    selectedVal={selectedEquipment}
                    setSelectedVal={setSelectedEquipment}
                    options={equipment}
                    placeholder='Select Equipment'
                    label='Equipment'
                />
            </YStack>
            <Button
                marginTop='$space.7'
                backgroundColor='$blue10'
                color='$gray1'
                disabled={isCreateBtnDisabled}
            >
                Create
            </Button>
        </YStack>
    );
}
