import { useQuery } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GET_ALL_BODY_PARTS_QUERY_KEY } from 'src/api/body-part-service/BodyPartApiConfig';
import * as BodyPartApi from 'src/api/body-part-service/BodyPartApiService';
import { GET_ALL_EQUIPMENT_QUERY_KEY } from 'src/api/equipment-service/EquipmentApiConfig';
import * as EquipmentApi from 'src/api/equipment-service/EquipmentApiService';
import { useCreateExercise } from 'src/hooks/workout-tracker/useCreateExercise';
import { Button, Dialog, H4, Input, Spinner, XStack, YStack } from 'tamagui';
import DropdownMenu from '../common/DropdownMenu';

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateExerciseModal({ setIsOpen }: Props) {
    const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
    const [selectedEquipment, setSelectedEquipment] = useState<string>('');
    const [exerciseName, setExerciseName] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const { data: equipment } = useQuery({
        queryFn: EquipmentApi.getAllEquipment,
        queryKey: [GET_ALL_EQUIPMENT_QUERY_KEY],
        staleTime: Infinity,
        gcTime: Infinity,
    });
    const { data: bodyParts } = useQuery({
        queryFn: BodyPartApi.getAllBodyParts,
        queryKey: [GET_ALL_BODY_PARTS_QUERY_KEY],
        staleTime: Infinity,
        gcTime: Infinity,
    });
    const { createExercise, isPending } = useCreateExercise(
        () => {
            resetState();
        },
        (error) => {
            console.log(error);
        }
    );

    useEffect(() => {
        setDisabled(!exerciseName || !selectedBodyPart || !selectedEquipment);
    }, [exerciseName, selectedBodyPart, selectedEquipment]);

    function resetState() {
        setSelectedBodyPart('');
        setSelectedEquipment('');
        setExerciseName('');
        setIsOpen(false);
    }

    function onSaveExercisePress() {
        console.log(selectedBodyPart, selectedEquipment, exerciseName);
        createExercise({
            name: exerciseName,
            equipmentId: parseInt(selectedEquipment),
            bodyPartId: parseInt(selectedBodyPart),
        });
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
