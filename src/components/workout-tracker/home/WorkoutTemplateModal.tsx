import IonIcons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { IWorkoutTemplateResponse } from 'src/api/workout-template-service/responses/IWorkoutTemplateResponse';
import { Modal, ModalContent, ModalOverlay } from 'src/components/common/modal';
import { useIsWorkoutInProgress } from 'src/context/workout-tracker/IsWorkoutInProgressContext';
import { initializeWorkoutFromTemplate } from 'src/redux/workout-form/WorkoutFormSlice';
import { Button, H4, SizableText, useTheme, View, XStack } from 'tamagui';

interface Props {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    workoutTemplate: IWorkoutTemplateResponse;
    setIsWorkoutFormOpening: Dispatch<SetStateAction<boolean>>;
}

export default function WorkoutTemplateModal({
    isModalOpen,
    setIsModalOpen,
    workoutTemplate,
    setIsWorkoutFormOpening,
}: Props) {
    const { isWorkoutInProgress, setWorkoutInProgress } = useIsWorkoutInProgress();
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();

    function startWorkout() {
        setIsWorkoutFormOpening(true);
        setIsModalOpen(false);
        dispatch(initializeWorkoutFromTemplate({ template: workoutTemplate }));
        setWorkoutInProgress(true);

        // Timeout used so modal closes before workout form page opens
        setTimeout(() => {
            setIsWorkoutFormOpening(false);
            router.push('WorkoutForm');
        }, 200);
    }

    function onDeletePress() {
        Alert.alert(
            'Delete Workout Template',
            `Are you sure you want to delete ${workoutTemplate.name}`,
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        setIsModalOpen(false);
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
                        height='0'
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
                        height='0'
                        onPress={onDeletePress}
                        backgroundColor='$red6'
                    >
                        <IonIcons name='trash-outline' size={24} color={theme.red10.val} />
                    </Button>
                </XStack>
                <FlatList
                    scrollEnabled={false}
                    data={workoutTemplate.exercises}
                    keyExtractor={(item) => item.exerciseId}
                    renderItem={({ item }) => (
                        <H4>
                            {item.exerciseName}: {item.sets.length} sets
                        </H4>
                    )}
                    ItemSeparatorComponent={() => <View height='$2' />}
                />
                <Button
                    fontWeight='bold'
                    onPress={startWorkout}
                    marginTop='$space.4'
                    color={isWorkoutInProgress ? '$gray10' : '$green10'}
                    backgroundColor={isWorkoutInProgress ? '$gray6' : '$green6'}
                    disabled={isWorkoutInProgress}
                >
                    Start from template
                </Button>
            </ModalContent>
        </Modal>
    );
}
