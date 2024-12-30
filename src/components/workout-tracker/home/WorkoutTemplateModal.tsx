import IonIcons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React, { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { WorkoutTemplateResponseDto } from 'src/api/generated';
import { useDeleteWorkoutTemplate, useGetExercisesWithWorkoutDetails } from 'src/api/hooks';
import { Modal, ModalContent, ModalOverlay } from 'src/components/common/modal';
import { useIsWorkoutInProgress } from 'src/context/workout-tracker/IsWorkoutInProgressContext';
import { initializeWorkoutFromTemplate } from 'src/redux/workout-form/WorkoutFormSlice';
import { Button, SizableText, Spinner, useTheme, View, XStack, YStack } from 'tamagui';

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    workoutTemplate: WorkoutTemplateResponseDto;
}

export default function WorkoutTemplateModal({
    isModalOpen,
    setIsModalOpen,
    workoutTemplate,
}: Props) {
    const { isWorkoutInProgress, setWorkoutInProgress } = useIsWorkoutInProgress();
    const { deleteWorkoutTemplate, isPending } = useDeleteWorkoutTemplate(
        () => setIsModalOpen(false),
        (e) => Alert.alert('Error deleting workout template: ' + e.message)
    );
    const {
        data: exerciseDetails,
        isLoading: isExerciseDetailsLoading,
        error: exerciseDetailsError,
    } = useGetExercisesWithWorkoutDetails();
    const dispatch = useDispatch();
    const theme = useTheme();

    function startWorkout() {
        setIsModalOpen(false);
        setWorkoutInProgress(true);
        setTimeout(() => {
            dispatch(
                initializeWorkoutFromTemplate({
                    template: workoutTemplate,
                    exerciseDetails: exerciseDetails ?? [],
                })
            );

            // Timeout used so modal closes before workout form page opens
        }, 300);
    }

    function onDeletePress() {
        Alert.alert(
            'Delete Workout Template',
            `Are you sure you want to delete ${workoutTemplate.name}`,
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        deleteWorkoutTemplate(workoutTemplate.id);
                    },
                    style: 'destructive',
                },
                {
                    text: 'No',
                    style: 'cancel',
                },
            ]
        );
    }

    return (
        <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
            <ModalOverlay
                key='workout-template-modal-overlay'
                onPress={() => setIsModalOpen(false)}
            />
            <ModalContent key='workout-template-modal-content' height='80%' width='80%'>
                <XStack
                    alignItems='center'
                    justifyContent='space-between'
                    marginBottom='$space.4'
                    position='relative'
                >
                    <Button
                        fontWeight='bold'
                        paddingHorizontal='$2'
                        paddingVertical='$1'
                        height='auto'
                        onPress={() => setIsModalOpen(false)}
                    >
                        <IonIcons name='close-outline' size={24} />
                    </Button>
                    <SizableText size='$6' fontWeight='bold'>
                        {workoutTemplate.name}
                    </SizableText>
                    <Button
                        fontWeight='bold'
                        paddingHorizontal='$2'
                        paddingVertical='$1'
                        height='auto'
                        onPress={onDeletePress}
                        backgroundColor='$red6'
                    >
                        {isPending ? (
                            <Spinner />
                        ) : (
                            <IonIcons name='trash-outline' size={24} color={theme.red10.val} />
                        )}
                    </Button>
                </XStack>
                <FlatList
                    scrollEnabled={false}
                    data={workoutTemplate.exercises}
                    keyExtractor={(item) => item.exerciseId}
                    renderItem={({ item }) => (
                        <YStack>
                            <SizableText size='$4' fontWeight='bold'>
                                {item.exerciseName}: {item.sets.length} sets
                            </SizableText>
                        </YStack>
                    )}
                    ItemSeparatorComponent={() => <View height='$2' />}
                />
                {exerciseDetailsError ? (
                    <SizableText color='$red10' fontWeight='bold' size='$2' textAlign='center'>
                        Cannot start workout due to unknown error: Please restart app. ( Code:{' '}
                        {exerciseDetailsError.statusCode})
                    </SizableText>
                ) : (
                    <Link href='/workout-tracker/workout-form' asChild>
                        <Button
                            fontWeight='bold'
                            onPress={startWorkout}
                            marginTop='$space.4'
                            color={
                                isWorkoutInProgress || isExerciseDetailsLoading
                                    ? '$gray10'
                                    : '$green10'
                            }
                            backgroundColor={
                                isWorkoutInProgress || isExerciseDetailsLoading
                                    ? '$gray6'
                                    : '$green6'
                            }
                            disabled={isWorkoutInProgress || isExerciseDetailsLoading}
                        >
                            Start from template
                        </Button>
                    </Link>
                )}
            </ModalContent>
        </Modal>
    );
}
