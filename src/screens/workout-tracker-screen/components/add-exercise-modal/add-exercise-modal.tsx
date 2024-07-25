/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Input, Layout, List, Modal, useStyleSheet, useTheme } from '@ui-kitten/components';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Spacer } from 'src/components';
import { useGetExercisesForWorkout } from 'src/hooks/api/exercises/useGetExercisesForWorkout';
import { useSelectedExercisesFromModal } from 'src/hooks/useSelectedExercisesFromModal';
import type { ExerciseForWorkout } from 'src/interfaces';
import type { WorkoutFormExercise } from 'src/interfaces/workout-form';
import CreateExerciseModal from '../create-exercise-modal/create-exercise-modal';
import ModalExerciseItem from './modal-exercise-item';
import NoExercisesDisplay from './no-exercises-display';

interface Props {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    exercisesInWorkout: WorkoutFormExercise[];
    addExercises: (exercises: Set<ExerciseForWorkout>) => void;
}

export default function AddExerciseModal({
    visible,
    setVisible,
    addExercises,
    exercisesInWorkout,
}: Props): React.ReactElement {
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const { selectedExercises, toggleExercise, clearSelectedExercises } =
        useSelectedExercisesFromModal();
    const [exercisesDisplay, setExercisesDisplay] = useState<ExerciseForWorkout[]>([]);
    const { exercisesForWorkout, isLoading } = useGetExercisesForWorkout();
    const [createExerciseModalVisible, setCreateExerciseModalVisible] = useState<boolean>(false);
    const [exerciseSearchText, setExerciseSearchText] = useState<string>('');

    useEffect(() => {
        setExercisesDisplay(exercisesForWorkout);
    }, [visible]);

    function handleAddExercises(): void {
        addExercises(selectedExercises);
        setVisible(false);
        clearSelectedExercises();
    }

    function handleSearch(text: string): void {
        setExerciseSearchText(text);
        setExercisesDisplay(
            exercisesForWorkout.filter((exercise) =>
                exercise.name.toLowerCase().includes(text.toLowerCase())
            )
        );
    }

    const renderFooter = (): React.ReactElement => <>{!isLoading ? null : <ActivityIndicator />}</>;
    const renderExercise = ({ item }: { item: ExerciseForWorkout }): React.ReactElement => (
        <ModalExerciseItem
            exercise={item}
            toggleExercise={toggleExercise}
            isExerciseSelected={selectedExercises.has(item)}
            disabled={Boolean(exercisesInWorkout.find((exercise) => exercise.id === item.id))}
        />
    );

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <CreateExerciseModal
                visible={createExerciseModalVisible}
                setVisible={setCreateExerciseModalVisible}
                addExerciseToSelectedExercises={toggleExercise}
                setExercisesDisplay={setExercisesDisplay}
                exerciseSearchText={exerciseSearchText}
            />
            <Layout style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setVisible(false)}>
                        <Ionicons size={24} name='close-outline' />
                    </TouchableOpacity>
                    <Button
                        size='small'
                        disabled={!selectedExercises.size}
                        onPress={handleAddExercises}
                    >
                        Add to Workout
                    </Button>
                </View>
                <Spacer size='spacing-1' />
                <View style={styles.inputContainer}>
                    <Input
                        size='large'
                        placeholder='Search for exercise...'
                        onChangeText={handleSearch}
                    />
                </View>
                <Spacer size='spacing-3' />
                <View style={{ paddingHorizontal: 16 }}>
                    <Button
                        appearance='outline'
                        size='tiny'
                        onPress={() => setCreateExerciseModalVisible(true)}
                    >
                        Create new Exercise
                    </Button>
                </View>
                <Spacer size='spacing-8' />
                <View
                    style={{
                        height: 1,
                        backgroundColor: theme['color-basic-500'],
                    }}
                />
                {exercisesDisplay.length > 0 ? (
                    <List
                        data={exercisesDisplay}
                        renderItem={renderExercise}
                        style={{ backgroundColor: 'transparent' }}
                        keyExtractor={(item) => item.id}
                        ListFooterComponent={renderFooter}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: theme['color-basic-500'],
                                }}
                            />
                        )}
                    />
                ) : (
                    <NoExercisesDisplay
                        setCreateExerciseModalVisible={setCreateExerciseModalVisible}
                        exerciseName={exerciseSearchText}
                    />
                )}
            </Layout>
        </Modal>
    );
}

const themedStyles = StyleSheet.create({
    modalContainer: {
        width: Dimensions.get('window').width - 32,
        height: Dimensions.get('window').height - 200,
        borderRadius: 12,
        paddingTop: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    closeBtn: {
        backgroundColor: 'color-basic-500',
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 5,
    },
    inputContainer: {
        paddingHorizontal: 16,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
