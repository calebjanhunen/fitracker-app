import React, { useEffect, useState, type Dispatch } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { Button, Spacer, Text, TextInput } from '../../../../components';
import useGetExercisesList from '../../../../hooks/useGetExercisesList';
import { type Exercise as ExerciseInterface } from '../../../../interfaces/Exercise';
import { type Tables } from '../../../../interfaces/Tables';
import { getMostRecentExercise } from '../../../../services/api/WorkoutExercisesApi';
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

interface Props {
    modalVisible: boolean;
    setModalVisible: (val: boolean) => void;
    workoutExercises: ExerciseInterface[];
    dispatchExercises: Dispatch<ExercisesActions>;
}

export default function AddExerciseModal(props: Props): React.ReactElement {
    const [selectedExercises, setSelectedExercises] = useState<ExerciseInterface[]>([]);
    const [exercisesDisplay, setExercisesDisplay] = useState<Array<Tables<'exercises'>>>([]);
    const { exercises, isLoading } = useGetExercisesList();

    useEffect(() => {
        setExercisesDisplay(exercises);
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

    function searchForExercise(query: string): void {
        setExercisesDisplay(
            exercises.filter((exercise) =>
                exercise.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    }

    async function submitAndCloseModal(): Promise<void> {
        const selectedExercisesWithPreviousSets = await addPreviousSetsToExercises();
        addExercisesToWorkout(selectedExercisesWithPreviousSets);
        closeModal();
    }

    async function addPreviousSetsToExercises(): Promise<ExerciseInterface[]> {
        const selectedExercisesWithPreviousSets: ExerciseInterface[] = [];
        for (const [index, selectedExercise] of selectedExercises.entries()) {
            const fetchedExercise = await getMostRecentExercise(selectedExercise.id);
            console.log(fetchedExercise);

            const exerciseToEdit = { ...selectedExercises[index] };
            if (fetchedExercise) {
                const previousSets = fetchedExercise.sets.map((set) => {
                    return { reps: set.reps, weight: set.weight, rpe: set.rpe };
                });

                const newExercise: ExerciseInterface = { ...exerciseToEdit, previousSets };
                selectedExercisesWithPreviousSets.push(newExercise);
            } else {
                selectedExercisesWithPreviousSets.push(exerciseToEdit);
            }
        }
        return selectedExercisesWithPreviousSets;
    }

    function addExercisesToWorkout(selectedExercisesWithPreviousSets: ExerciseInterface[]): void {
        props.dispatchExercises({
            type: ExercisesActionsTypes.ADD_EXERCISES,
            payload: selectedExercisesWithPreviousSets,
        });
    }

    function closeModal(): void {
        props.setModalVisible(false);
        setSelectedExercises([]);
        setExercisesDisplay(exercises);
    }

    return (
        <Modal transparent={true} visible={props.modalVisible}>
            <ModalOverlay onPress={closeModal} activeOpacity={1}>
                <Blur intensity={40}>
                    <TouchableWithoutFeedback>
                        <ModalContainer>
                            <PaddedContainer>
                                <ModalHeader>
                                    <Text variant='headline'>Add Exercise</Text>
                                    <TouchableOpacity onPress={closeModal}>
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
