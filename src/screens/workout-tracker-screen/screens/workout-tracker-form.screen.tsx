import React, { useReducer } from 'react';

import { Button, Input, List } from '@ui-kitten/components';
import uuid from 'react-native-uuid';

import { PageView, Spacer } from 'src/components';
import { type ExerciseInWorkout } from 'src/interfaces/workout';
import { WorkoutFormActionTypes, reducer } from 'src/state/reducers/workout-form-reducer';
import ExerciseComponent from '../components/workout-tracker-form/exercise-component';

export default function WorkoutTrackerFormScreen(): React.ReactElement {
    const [exercises, dispatchExercises] = useReducer(reducer, []);
    const renderExercise = ({ item }: { item: ExerciseInWorkout }): React.ReactElement => (
        <ExerciseComponent exercise={item} dispatchExercises={dispatchExercises} />
    );
    // console.log(JSON.stringify(exercises, null, 2));

    function onAddExercise(): void {
        const exerciseId = uuid.v4().toString();
        dispatchExercises({
            type: WorkoutFormActionTypes.ADD_EXERCISES,
            payload: [{ id: exerciseId, name: `EXERCISE: ${exerciseId}`, sets: [] }],
        });
    }

    return (
        <PageView>
            <Input placeholder='Enter Workout Name' />
            <Spacer size='spacing-8' />
            <List
                data={exercises}
                renderItem={renderExercise}
                ItemSeparatorComponent={() => <Spacer size='spacing-5' />}
            />
            <Spacer size='spacing-8' />
            <Button size='small' onPress={onAddExercise}>
                Add Exercise
            </Button>
        </PageView>
    );
}
