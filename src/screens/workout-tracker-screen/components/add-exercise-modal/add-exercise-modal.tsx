/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { type Dispatch, type SetStateAction } from 'react';

import { Card, Input, List, Modal, useTheme } from '@ui-kitten/components';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

import { Spacer } from 'src/components';
import { useExercisesApi } from 'src/hooks/useExercisesApi';
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
    const { exercises, getMore, isLoading, hasMore } = useExercisesApi(10);
    const renderFooter = (): React.ReactElement => <>{!isLoading ? null : <ActivityIndicator />}</>;
    const renderExercise = ({ item }: { item: Exercise }): React.ReactElement => (
        <ModalExerciseItem exercise={item} />
    );

    function handleLoadMore(): void {
        if (!isLoading && hasMore) void getMore();
    }

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
        >
            <Card
                style={{
                    width: Dimensions.get('window').width - 32,
                    height: Dimensions.get('window').height - 200,
                }}
                disabled={true}
            >
                <Input size='large' placeholder='Search for exercise...' />
                <Spacer size='spacing-8' />
                <List
                    data={exercises}
                    renderItem={renderExercise}
                    style={{ backgroundColor: 'transparent' }}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleLoadMore}
                    // onEndReachedThreshold={0.1}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                height: 1,
                                backgroundColor: theme['color-basic-500'],
                            }}
                        />
                    )}
                />
            </Card>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
