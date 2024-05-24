/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { type Dispatch } from 'react';

import { Input, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { type SetInWorkout } from 'src/interfaces/workout';
import {
    WorkoutFormActionTypes,
    type WorkoutFormActions,
} from 'src/state/reducers/workout-form-reducer';

interface Props {
    set: SetInWorkout;
    exerciseId: string;
    dispatchExercises: Dispatch<WorkoutFormActions>;
}

export default function SetComponent({
    set,
    exerciseId,
    dispatchExercises,
}: Props): React.ReactElement {
    function handleUpdateSet(key: 'weight' | 'reps' | 'rpe', value: string): void {
        dispatchExercises({
            type: WorkoutFormActionTypes.UPDATE_SET,
            exerciseId,
            setId: set.id,
            updates: { [key]: parseInt(value) },
        });
    }

    return (
        <View style={styles.set}>
            <Text style={styles.setNum}>1</Text>
            <Text style={styles.previous}>140x10 @ 9</Text>
            <Input
                onChangeText={(text) => handleUpdateSet('weight', text)}
                keyboardType='number-pad'
                size='small'
                style={styles.weight}
            />
            <Input
                onChangeText={(text) => handleUpdateSet('reps', text)}
                keyboardType='number-pad'
                size='small'
                style={styles.reps}
            />
            <Input
                onChangeText={(text) => handleUpdateSet('rpe', text)}
                keyboardType='number-pad'
                size='small'
                style={styles.rpe}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    set: {
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
