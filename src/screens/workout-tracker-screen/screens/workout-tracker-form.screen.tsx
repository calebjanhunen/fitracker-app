import React from 'react';

import { Button, Input, List } from '@ui-kitten/components';
import uuid from 'react-native-uuid';

import { PageView, Spacer } from 'src/components';
import { useWorkoutForm } from 'src/hooks/useWorkoutForm';
import { type ExerciseInWorkout } from 'src/interfaces/workout';
import ExerciseComponent from '../components/workout-tracker-form/exercise-component';

export default function WorkoutTrackerFormScreen(): React.ReactElement {
    const {
        workout,
        updateWorkoutName,
        addExercises,
        deleteExercise,
        addSet,
        deleteSet,
        updateSet,
    } = useWorkoutForm();
    const renderExercise = ({ item }: { item: ExerciseInWorkout }): React.ReactElement => (
        <ExerciseComponent
            exercise={item}
            deleteExercise={deleteExercise}
            addSet={addSet}
            deleteSet={deleteSet}
            updateSet={updateSet}
        />
    );
    // console.log(JSON.stringify(workout, null, 2));

    function onAddExercise(): void {
        const exerciseId = uuid.v4().toString();
        addExercises([{ id: exerciseId, name: `EXERCISE: ${exerciseId}`, sets: [] }]);
    }

    return (
        <PageView>
            <Input placeholder='Enter Workout Name' onChangeText={updateWorkoutName} />
            <Spacer size='spacing-8' />
            <List
                data={workout.exercises}
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
