import React, { Dispatch, SetStateAction, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Dialog, H4, Input, XStack, YStack } from 'tamagui';
import DropdownMenu from '../common/DropdownMenu';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateExerciseModal({ setIsOpen }: Props) {
    const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
    const [selectedEquipment, setSelectedEquipment] = useState<string>('');
    return (
        <Dialog.Portal>
            <Dialog.Overlay
                key='create-exercise-modal-overlay'
                onPress={() => setIsOpen(false)}
                flex={1}
                zIndex={1}
                animation='100ms'
                opacity={0.5}
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />
            <KeyboardAvoidingView
                style={{ zIndex: 2 }}
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            >
                <Dialog.Content
                    key='create-exercise-modal'
                    zIndex={2}
                    animateOnly={['transform', 'opacity']}
                    animation={[
                        '100ms',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                >
                    <XStack
                        justifyContent='space-between'
                        alignItems='center'
                        gap='$4'
                        paddingBottom='$4'
                    >
                        <Dialog.Close asChild>
                            <Button
                                fontWeight='bold'
                                paddingHorizontal='$2'
                                paddingVertical='$1'
                                height='0'
                            >
                                X
                            </Button>
                        </Dialog.Close>
                        <H4>Create Exercise</H4>
                        <Dialog.Close asChild>
                            <Button
                                fontWeight='bold'
                                backgroundColor='$green6'
                                color='$green10'
                                paddingVertical='$2'
                                height='0'
                            >
                                Save
                            </Button>
                        </Dialog.Close>
                    </XStack>
                    <YStack gap='$space.4'>
                        <Input placeholder='Exercise Name' />
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
                </Dialog.Content>
            </KeyboardAvoidingView>
        </Dialog.Portal>
    );
}

const bodyParts = [
    { id: 1, name: 'Biceps' },
    { id: 2, name: 'Triceps' },
    { id: 3, name: 'Shoulders' },
    { id: 4, name: 'Chest' },
    { id: 5, name: 'Back' },
    { id: 6, name: 'Core' },
    { id: 7, name: 'Legs' },
    { id: 8, name: 'Other' },
];

const equipment = [
    { id: 1, name: 'Barbell' },
    { id: 2, name: 'Dumbbell' },
    { id: 3, name: 'Cable' },
    { id: 4, name: 'Machine' },
    { id: 5, name: 'Bodyweight' },
];
