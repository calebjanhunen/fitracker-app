import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { IErrorResponse } from 'src/api/client';
import { useCreateExercise, useGetEquipmentAndBodyParts } from 'src/api/hooks';
import { Button, Dialog, H4, Input, Spinner, XStack, YStack } from 'tamagui';
import DropdownMenu from '../../common/DropdownMenu';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setSelectedExercises: (createdExerciseId: string) => void;
}

export default function CreateExerciseModal({ setIsOpen, setSelectedExercises }: Props) {
    const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
    const [selectedEquipment, setSelectedEquipment] = useState<string>('');
    const [exerciseName, setExerciseName] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const {
        equipment,
        bodyParts,
        isLoading: isEqAndBpLoading,
        error: eqAndBpErr,
    } = useGetEquipmentAndBodyParts();
    const { createExercise, isPending } = useCreateExercise((createdExercise) => {
        resetState();
        setSelectedExercises(createdExercise.id);
    }, onCreateExerciseError);

    useEffect(() => {
        setDisabled(!exerciseName || !selectedBodyPart || !selectedEquipment);
    }, [exerciseName, selectedBodyPart, selectedEquipment]);

    if (isEqAndBpLoading) {
        return <Spinner />;
    }

    if (eqAndBpErr) {
        Alert.alert('Error getting equipment and body parts');
        return null;
    }

    function resetState() {
        setSelectedBodyPart('');
        setSelectedEquipment('');
        setExerciseName('');
        setIsOpen(false);
    }

    function onSaveExercisePress() {
        createExercise({
            name: exerciseName,
            equipmentId: parseInt(selectedEquipment),
            bodyPartId: parseInt(selectedBodyPart),
        });
    }

    function onCreateExerciseError(error: IErrorResponse) {
        if (error.statusCode === 400) {
            Alert.alert('Error saving exercise', error.message[0]);
        } else {
            Alert.alert('Error saving exercise', error.message[0]);
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay
                key='create-exercise-modal-overlay'
                onPress={resetState}
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
                                onPress={resetState}
                            >
                                X
                            </Button>
                        </Dialog.Close>
                        <H4>Create Exercise</H4>
                        <Button
                            fontWeight='bold'
                            backgroundColor={disabled ? '$gray6' : '$green6'}
                            color={disabled ? '$gray10' : '$green10'}
                            paddingVertical='$2'
                            height='0'
                            onPress={onSaveExercisePress}
                            disabled={disabled}
                        >
                            {isPending ? <Spinner /> : 'Save'}
                        </Button>
                    </XStack>
                    <YStack gap='$space.4'>
                        <Input placeholder='Exercise Name' onChangeText={setExerciseName} />
                        <DropdownMenu
                            selectedVal={selectedBodyPart}
                            setSelectedVal={setSelectedBodyPart}
                            options={bodyParts ?? []}
                            placeholder='Select Body Part'
                            label='Body Parts'
                        />
                        <DropdownMenu
                            selectedVal={selectedEquipment}
                            setSelectedVal={setSelectedEquipment}
                            options={equipment ?? []}
                            placeholder='Select Equipment'
                            label='Equipment'
                        />
                    </YStack>
                </Dialog.Content>
            </KeyboardAvoidingView>
        </Dialog.Portal>
    );
}
