/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { type Dispatch, type SetStateAction } from 'react';

import { Input, Layout, List, Modal, useTheme } from '@ui-kitten/components';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

import { Spacer } from 'src/components';
import { useExercisesForWorkoutApi } from 'src/hooks/api/useExercisesForWorkoutApi';
import { useExercisesApi } from 'src/hooks/useExercisesApi';
import { useSelectedExercisesFromModal } from 'src/hooks/useSelectedExercisesFromModal';
import type { Exercise, ExerciseInWorkout } from 'src/interfaces';
import ModalExerciseItem from './modal-exercise-item';

interface Props {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    addExercises: (exercises: ExerciseInWorkout[]) => void;
}

export default function AddExerciseModal({
    visible,
    setVisible,
    addExercises,
}: Props): React.ReactElement {
    const theme = useTheme();
    const { exercises, isLoading } = useExercisesForWorkoutApi();
    const { selectedExercises, toggleExercise } = useSelectedExercisesFromModal();
    const renderFooter = (): React.ReactElement => <>{!isLoading ? null : <ActivityIndicator />}</>;
    const renderExercise = ({ item }: { item: Exercise }): React.ReactElement => (
        <ModalExerciseItem
            exercise={item}
            toggleExercise={toggleExercise}
            isExerciseSelected={selectedExercises.has(item)}
        />
    );

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Layout
                style={{
                    width: Dimensions.get('window').width - 32,
                    height: Dimensions.get('window').height - 200,
                    borderRadius: 12,
                    paddingTop: 8,
                    // marginHorizontal: 0,
                }}
            >
                <Input size='large' placeholder='Search for exercise...' />
                <Spacer size='spacing-8' />
                <List
                    data={exercises}
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

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
