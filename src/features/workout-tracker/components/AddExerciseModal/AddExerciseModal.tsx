import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { Button, Spacer, Text, TextInput } from '../../../../components';
import { type Exercise as ExerciseInterface } from '../../../../interfaces/Exercise';
import { type Tables } from '../../../../interfaces/Tables';
import { ExercisesAPI } from '../../../../services/api/ExercisesAPI';
import { ExercisesActionsTypes, type ExercisesActions } from '../../reducers/ExercisesReducer';
import {
    Blur,
    Icon,
    ModalContainer,
    ModalHeader,
    ModalOverlay,
    PaddedContainer,
} from './AddExerciseModalStyles';
import Exercise from './Exercise';

const PAGE_SIZE = 20;

interface Props {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    dispatchExercises: Dispatch<ExercisesActions>;
    workoutExercises: ExerciseInterface[];
}

function closeModal(
    setSelectedExercises: Dispatch<SetStateAction<ExerciseInterface[]>>,
    setExercises: Dispatch<SetStateAction<Array<Tables<'exercises'>>>>,
    setModalVisible: (val: boolean) => void,
    setPage: Dispatch<SetStateAction<number>>
): void {
    setModalVisible(false);
    setSelectedExercises([]);
    setExercises([]);
    setPage(1);
}

function addExercisesToWorkout(
    selectedExercises: ExerciseInterface[],
    dispatchExercises: Dispatch<ExercisesActions>
): void {
    dispatchExercises({ type: ExercisesActionsTypes.ADD_EXERCISES, payload: selectedExercises });
}

export default function AddExerciseModal(props: Props): React.ReactElement {
    const [selectedExercises, setSelectedExercises] = useState<ExerciseInterface[]>([]);
    const [exercises, setExercises] = useState<Array<Tables<'exercises'>>>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (props.modalVisible) {
            void getExercises();
        }
    }, [page, props.modalVisible]);

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
        const offset = (page - 1) * PAGE_SIZE;
        try {
            const fetchedExercises = await ExercisesAPI.getExercises({
                from: offset,
                to: offset + PAGE_SIZE - 1,
            });
            if (fetchedExercises) {
                setExercises((prevExercises) => [...prevExercises, ...fetchedExercises]);
            }
        } catch (error) {
            const errorMessage: string = error.message;
            alert(`Error: ${errorMessage}`);
        }
    }

    function submitAndCloseModal(): void {
        addExercisesToWorkout(selectedExercises, props.dispatchExercises);
        closeModal(setSelectedExercises, setExercises, props.setModalVisible, setPage);
    }

    return (
        <Modal transparent={true} visible={props.modalVisible}>
            <ModalOverlay
                onPress={() => {
                    closeModal(setSelectedExercises, setExercises, props.setModalVisible, setPage);
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
                                                props.setModalVisible,
                                                setPage
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
                                />
                                <Spacer size='xs' />
                            </PaddedContainer>
                            <FlatList
                                style={{ flex: 1, width: '100%' }}
                                data={exercises}
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
                                        workoutExercises={props.workoutExercises}
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
                                onEndReached={() => {
                                    setPage((prevPage) => prevPage + 1);
                                }}
                            />
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
