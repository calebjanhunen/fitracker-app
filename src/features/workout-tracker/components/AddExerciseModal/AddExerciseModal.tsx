import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { Button, Spacer, Text, TextInput } from '../../../../components';
import { type Exercise as ExerciseInterface } from '../../../../interfaces/Exercise';
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
    setExercises: Dispatch<SetStateAction<ExerciseInterface[]>>;
}

function closeModal(setModalVisible: (val: boolean) => void): void {
    setModalVisible(false);
}

function addExercisesToWorkout(
    selectedExercises: number[],
    setSelectedExercises: Dispatch<SetStateAction<number[]>>,
    setExercises: Dispatch<SetStateAction<ExerciseInterface[]>>,
    setModalVisible: (val: boolean) => void
): void {
    // TODO: Add exercises to exercises state
    setSelectedExercises([]);
    setModalVisible(false);
}

export default function AddExerciseModal(props: Props): React.ReactElement {
    const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

    const buttonText = (): string => {
        if (selectedExercises.length === 0) {
            return 'Select an exercise';
        } else if (selectedExercises.length === 1) {
            return `Add ${selectedExercises.length} Exercise`;
        } else {
            return `Add ${selectedExercises.length} Exercises`;
        }
    };

    return (
        <Modal transparent={true} visible={props.modalVisible}>
            <ModalOverlay
                onPress={() => {
                    closeModal(props.setModalVisible);
                }}
            >
                <Blur intensity={40}>
                    <TouchableWithoutFeedback>
                        <ModalContainer>
                            <PaddedContainer>
                                <ModalHeader>
                                    <Text variant='headline'>Add Exercise</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            closeModal(props.setModalVisible);
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
                                data={[0, 1, 2]}
                                renderItem={({ item, index }) => (
                                    <Exercise
                                        selectedExercises={selectedExercises}
                                        setSelectedExercises={setSelectedExercises}
                                        id={index}
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
                            <PaddedContainer>
                                <Button
                                    variant='full'
                                    backgroundColor='primary'
                                    textColor='white'
                                    onPress={() => {
                                        addExercisesToWorkout(
                                            selectedExercises,
                                            setSelectedExercises,
                                            props.setExercises,
                                            props.setModalVisible
                                        );
                                    }}
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
