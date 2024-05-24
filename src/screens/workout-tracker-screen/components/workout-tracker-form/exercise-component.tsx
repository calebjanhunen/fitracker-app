/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { memo, useState, type Dispatch } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { Button, List, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { Spacer } from 'src/components';
import { type ExerciseInWorkout, type SetInWorkout } from 'src/interfaces/workout';
import {
    WorkoutFormActionTypes,
    type WorkoutFormActions,
} from 'src/state/reducers/workout-form-reducer';
import SetComponent from './set-component';

interface Props {
    exercise: ExerciseInWorkout;
    dispatchExercises: Dispatch<WorkoutFormActions>;
}

const ExerciseComponent = memo(function ExerciseComponent({
    exercise,
    dispatchExercises,
}: Props): React.ReactElement {
    console.log('render: ', exercise.id);
    const renderSet = ({ item }: { item: SetInWorkout }): React.ReactElement => (
        <SetComponent set={item} exerciseId={exercise.id} dispatchExercises={dispatchExercises} />
    );

    function deleteExercise(): void {
        dispatchExercises({ type: WorkoutFormActionTypes.DELETE_EXERCISE, payload: exercise.id });
    }

    function addSet(): void {
        dispatchExercises({ type: WorkoutFormActionTypes.ADD_SET, payload: exercise.id });
    }

    return (
        <View>
            <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName} category='h6' numberOfLines={1}>
                    {exercise.name}
                </Text>
                <Menu>
                    <MenuTrigger>
                        <FontAwesome size={24} name='ellipsis-v' />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption
                            onSelect={deleteExercise}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <Text>Delete</Text>
                            <FontAwesome size={16} name='trash' />
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
            <Spacer size='spacing-2' />
            <View style={styles.setHeader}>
                <Text category='label' style={styles.setNum}>
                    Set
                </Text>
                <Text category='label' style={styles.previous}>
                    Previous
                </Text>
                <Text category='label' style={styles.weight}>
                    Weight
                </Text>
                <Text category='label' style={styles.reps}>
                    Reps
                </Text>
                <Text category='label' style={styles.rpe}>
                    RPE
                </Text>
            </View>
            <Spacer size='spacing-1' />
            <List data={exercise.sets} renderItem={renderSet} />
            <Spacer size='spacing-3' />
            <Button size='tiny' appearance='outline' onPress={addSet}>
                Add Set
            </Button>
        </View>
    );
});
export default ExerciseComponent;

const styles = StyleSheet.create({
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    exerciseName: {
        flex: 1,
    },
    setHeader: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    setNum: {
        flex: 0.5,
        textAlign: 'center',
    },
    previous: {
        flex: 2,
        textAlign: 'center',
    },
    weight: {
        flex: 1.5,
        textAlign: 'center',
    },
    reps: {
        flex: 1.5,
        textAlign: 'center',
    },
    rpe: {
        flex: 0.8,
        textAlign: 'center',
    },
});
