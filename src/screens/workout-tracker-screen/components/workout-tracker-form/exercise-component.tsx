/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState, type Dispatch } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, List, MenuItem, OverflowMenu, Text } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

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

export default function ExerciseComponent({
    exercise,
    dispatchExercises,
}: Props): React.ReactElement {
    console.log('render: ', exercise.id);
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const menuButton = (): React.ReactElement => (
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons size={24} name='ellipsis-vertical' />
        </TouchableOpacity>
    );
    const renderSet = ({ item }: { item: SetInWorkout }): React.ReactElement => (
        <SetComponent set={item} exerciseId={exercise.id} dispatchExercises={dispatchExercises} />
    );

    function deleteExercise(): void {
        dispatchExercises({ type: WorkoutFormActionTypes.DELETE_EXERCISE, payload: exercise.id });
        setMenuVisible(false);
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
                {/* <OverflowMenu
                    anchor={menuButton}
                    visible={menuVisible}
                    // onBackdropPress={() => setMenuVisible(false)}
                >
                    <MenuItem
                        title='Delete'
                        // accessoryRight={() => <Ionicons name='trash' />}
                        onPress={deleteExercise}
                    />
                </OverflowMenu> */}
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
}

const styles = StyleSheet.create({
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
