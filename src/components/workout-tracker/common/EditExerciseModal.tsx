import { Link, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { IBodyPartResponse } from 'src/api/body-part-service/interfaces/IBodyPartResponse';
import { IErrorResponse } from 'src/api/client';
import { IEquipmentResponse } from 'src/api/equipment-service/interfaces/IEquipmentResponse';
import { ExerciseResponseDto } from 'src/api/generated';
import { useGetEquipmentAndBodyParts, useUpdateExercise } from 'src/api/hooks';
import { useEditExerciseModal } from 'src/context/workout-tracker/EditExerciseModalContext';
import { Button, Dialog, H4, Input, Spinner, XStack, YStack } from 'tamagui';
import DropdownMenu from '../../common/DropdownMenu';

interface Props {
    updateExerciseNameInForm: (exerciseId: string, newName: string) => void;
}

export default function EditExerciseModal({ updateExerciseNameInForm }: Props) {
    const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
    const [selectedEquipment, setSelectedEquipment] = useState<string>('');
    const [newExerciseName, setNewExerciseName] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const isNavigatingRef = useRef<boolean>(false);
    const router = useRouter();
    const {
        equipment,
        bodyParts,
        isLoading: isEqAndBpLoading,
        error: eqAndBpErr,
    } = useGetEquipmentAndBodyParts();
    const { updateExercise, isPending } = useUpdateExercise(
        onUpdateExerciseSuccess,
        onUpdateExerciseError
    );
    const { isModalOpen, setIsModalOpen, routeToNavigateBackTo, exerciseToEdit } =
        useEditExerciseModal();

    useEffect(() => {
        if (isModalOpen) {
            setSelectedBodyPart(getBodyPartId(exerciseToEdit.bodyPart, bodyParts));
            setSelectedEquipment(getEquipmentId(exerciseToEdit.equipment, equipment));
            setNewExerciseName(exerciseToEdit.name);
        }
    }, [isModalOpen, exerciseToEdit]);

    useEffect(() => {
        setDisabled(!newExerciseName || !selectedBodyPart || !selectedEquipment);
    }, [newExerciseName, selectedBodyPart, selectedEquipment]);

    if (isEqAndBpLoading) {
        return <Spinner />;
    }

    if (eqAndBpErr) {
        Alert.alert('Error getting equipment and body parts');
        return null;
    }

    function handleCloseModal(shouldNavigate: boolean, newName?: string) {
        if (isNavigatingRef.current) return;
        isNavigatingRef.current = true;

        setSelectedBodyPart('');
        setSelectedEquipment('');
        setNewExerciseName('');
        setIsModalOpen(false);
        if (shouldNavigate) {
            router.push({
                pathname: `${routeToNavigateBackTo}/${exerciseToEdit.id}`,
                params: { exerciseName: newName ?? exerciseToEdit.name },
            });
        }
        setTimeout(() => (isNavigatingRef.current = false), 50);
    }

    function onSaveExercisePress() {
        if (
            selectedBodyPart !== getBodyPartId(exerciseToEdit.bodyPart, bodyParts) ||
            selectedEquipment !== getEquipmentId(exerciseToEdit.equipment, equipment) ||
            newExerciseName !== exerciseToEdit.name
        ) {
            updateExercise({
                id: exerciseToEdit.id,
                request: {
                    name: newExerciseName,
                    bodyPartId: Number(selectedBodyPart),
                    equipmentId: Number(selectedEquipment),
                },
            });
        } else {
            handleCloseModal(false);
        }
    }

    function onUpdateExerciseError(error: IErrorResponse) {
        if (error.statusCode === 400) {
            Alert.alert('Error saving exercise', error.message[0]);
        } else {
            Alert.alert('Error saving exercise', error.message[0]);
        }
    }

    async function onUpdateExerciseSuccess(response: ExerciseResponseDto) {
        updateExerciseNameInForm(response.id, response.name);
        handleCloseModal(false);
    }
    return (
        <Dialog modal open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Dialog.Portal>
                <Dialog.Overlay
                    key='create-exercise-modal-overlay'
                    onPress={() => handleCloseModal(true)}
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
                                <Link
                                    href={{
                                        pathname: `${routeToNavigateBackTo}/${exerciseToEdit.id}`,
                                        params: { exerciseName: exerciseToEdit.name },
                                    }}
                                    asChild
                                >
                                    <Button
                                        fontWeight='bold'
                                        paddingHorizontal='$2'
                                        paddingVertical='$1'
                                        height='auto'
                                        onPress={() => handleCloseModal(false)}
                                    >
                                        X
                                    </Button>
                                </Link>
                            </Dialog.Close>
                            <H4>Edit Exercise</H4>
                            <Link
                                href={{
                                    pathname: `${routeToNavigateBackTo}/${exerciseToEdit.id}`,
                                    params: { exerciseName: newExerciseName },
                                }}
                                asChild
                            >
                                <Button
                                    fontWeight='bold'
                                    backgroundColor={disabled ? '$gray6' : '$green6'}
                                    color={disabled ? '$gray10' : '$green10'}
                                    paddingVertical='$2'
                                    height='auto'
                                    onPress={onSaveExercisePress}
                                    disabled={disabled}
                                >
                                    {isPending ? <Spinner /> : 'Update'}
                                </Button>
                            </Link>
                        </XStack>
                        <YStack gap='$space.4'>
                            <Input
                                value={newExerciseName}
                                placeholder='Exercise Name'
                                onChangeText={setNewExerciseName}
                            />
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
        </Dialog>
    );
}

function getEquipmentId(name: string, equipment: IEquipmentResponse[]): string {
    return equipment.find((eq) => eq.name === name)?.id.toString() ?? '';
}
function getBodyPartId(name: string, bodyParts: IBodyPartResponse[]): string {
    return bodyParts.find((bp) => bp.name === name)?.id.toString() ?? '';
}
