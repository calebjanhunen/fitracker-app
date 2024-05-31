/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Input, Layout, List, Modal, useStyleSheet, useTheme } from '@ui-kitten/components';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Spacer } from 'src/components';
import { useExercisesForWorkoutApi } from 'src/hooks/api/useExercisesForWorkoutApi';
import { useSelectedExercisesFromModal } from 'src/hooks/useSelectedExercisesFromModal';
import type { ExerciseForWorkout, ExerciseInWorkout } from 'src/interfaces';
import ModalExerciseItem from './modal-exercise-item';

interface Props {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    exercisesInWorkout: ExerciseInWorkout[];
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
    const { exercises, isLoading } = useExercisesForWorkoutApi();
    const { selectedExercises, toggleExercise, clearSelectedExercises } =
        useSelectedExercisesFromModal();
    const [exercisesDisplay, setExercisesDisplay] = useState<ExerciseForWorkout[]>([]);

    useEffect(() => {
        setExercisesDisplay(exercises);
    }, [visible]);

    function handleAddExercises(): void {
        addExercises(selectedExercises);
        setVisible(false);
        clearSelectedExercises();
    }

    function handleSearch(text: string): void {
        setExercisesDisplay(
            exercises.filter((exercise) => exercise.name.toLowerCase().includes(text.toLowerCase()))
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
                <Spacer size='spacing-8' />
                <View
                    style={{
                        height: 1,
                        backgroundColor: theme['color-basic-500'],
                    }}
                />
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
