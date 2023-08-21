import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { Button, Spacer, Text, TextInput } from '../../../../components';
import { useWorkoutExercises } from '../../../../hooks/useWorkoutExercises';
import { type Exercise as ExerciseInterface } from '../../../../interfaces/Exercise';
import { type Tables } from '../../../../interfaces/Tables';
import { ExercisesAPI } from '../../../../services/api/ExercisesAPI';
import {
    Blur,
    Icon,
    ModalContainer,
    ModalHeader,
    ModalOverlay,
    PaddedContainer,
} from './AddExerciseModalStyles';
import Exercise from './Exercise';

interface Props {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
}

function closeModal(
    setSelectedExercises: Dispatch<SetStateAction<ExerciseInterface[]>>,
    setExercises: Dispatch<SetStateAction<Array<Tables<'exercises'>>>>,
    setModalVisible: (val: boolean) => void
): void {
    setModalVisible(false);
    setSelectedExercises([]);
    setExercises([]);
}

export default function AddExerciseModal(props: Props): React.ReactElement {
    const [selectedExercises, setSelectedExercises] = useState<ExerciseInterface[]>([]);
    const { addExercisesToWorkout } = useWorkoutExercises();
    const [exercises, setExercises] = useState<Array<Tables<'exercises'>>>([]);
    const [exercisesDisplay, setExercisesDisplay] = useState<Array<Tables<'exercises'>>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (props.modalVisible) {
            void getExercises();
        }
    }, [props.modalVisible]);

    const buttonText = (): string => {
        if (selectedExercises.length === 0) {
            return 'Select an exercise';
        } else if (selectedExercises.length === 1) {
            return `Add ${selectedExercises.length} Exercise`;
        } else {
            return `Add ${selectedExercises.length} Exercises`;
        }
    };

    async function getExercises(): Promise<void> {
        setIsLoading(true);
        try {
            const fetchedExercises = await ExercisesAPI.getExercises();
            if (fetchedExercises) {
                setExercises(fetchedExercises);
                setExercisesDisplay(fetchedExercises);
            }
        } catch (error) {
            const errorMessage: string = error.message;
            alert(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }

    function searchForExercise(query: string): void {
        setExercisesDisplay(
            exercises.filter((exercise) =>
                exercise.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    }

    function submitAndCloseModal(): void {
        addExercisesToWorkout(selectedExercises);
        closeModal(setSelectedExercises, setExercises, props.setModalVisible);
    }

    return (
        <Modal transparent={true} visible={props.modalVisible}>
            <ModalOverlay
                onPress={() => {
                    closeModal(setSelectedExercises, setExercises, props.setModalVisible);
                }}
                activeOpacity={1}
            >
                <Blur intensity={40}>
                    <TouchableWithoutFeedback>
                        <ModalContainer>
                            <PaddedContainer>
                                <ModalHeader>
                                    <Text variant='headline'>Add Exercise</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            closeModal(
                                                setSelectedExercises,
                                                setExercises,
                                                props.setModalVisible
                                            );
                                        }}
                                    >
                                        <Icon name='close-circle-outline' size={24} />
                                    </TouchableOpacity>
                                </ModalHeader>
                                <Spacer size='xs' />
                                <TextInput
                                    variant='body'
                                    paddingTopAndBot='xxs'
                                    placeholder='Search for Exercise...'
                                    onChangeText={searchForExercise}
                                />
                                <Spacer size='xs' />
                            </PaddedContainer>
                            {isLoading ? (
                                <ActivityIndicator style={{ flex: 1 }} />
                            ) : (
                                <FlatList
                                    style={{ flex: 1, width: '100%' }}
                                    data={exercisesDisplay}
                                    renderItem={({ item }) => (
                                        <Exercise
                                            setSelectedExercises={setSelectedExercises}
                                            id={item.id}
                                            name={item.name}
                                            bodyPart={item.primary_muscle}
                                            isExerciseSelected={Boolean(
                                                selectedExercises.find(
                                                    (exercise) => exercise.id === item.id
                                                )
                                            )}
                                        />
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View
                                            style={{
                                                height: 1,
                                                backgroundColor: 'grey',
                                                width: '100%',
                                            }}
                                        />
                                    )}
                                />
                            )}

                            <PaddedContainer>
                                <Button
                                    variant='full'
                                    backgroundColor='primary'
                                    textColor='white'
                                    onPress={submitAndCloseModal}
                                    disabled={!(selectedExercises.length > 0)}
                                >
                                    {buttonText()}
                                </Button>
                                <Spacer size='md' />
                            </PaddedContainer>
                        </ModalContainer>
                    </TouchableWithoutFeedback>
                </Blur>
            </ModalOverlay>
        </Modal>
    );
}
