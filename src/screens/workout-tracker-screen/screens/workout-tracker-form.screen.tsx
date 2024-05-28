import React from 'react';

import { type StackScreenProps } from '@react-navigation/stack';
import { Button, Input, List } from '@ui-kitten/components';
import uuid from 'react-native-uuid';

import { PageView, Spacer } from 'src/components';
import { useWorkoutForm } from 'src/hooks/useWorkoutForm';
import { useWorkoutInProgress } from 'src/hooks/useWorkoutInProgress';
import { type ExerciseInWorkout } from 'src/interfaces/workout';
import { type WorkoutTrackerStackParamList } from 'src/navigation/workout-tracker-navigation';
import ExerciseComponent from '../components/workout-tracker-form/exercise-component';

type Props = StackScreenProps<WorkoutTrackerStackParamList, 'WorkoutTrackerForm'>;

export default function WorkoutTrackerFormScreen({ navigation }: Props): React.ReactElement {
    const {
        workout,
        updateWorkoutName,
        addExercises,
        deleteExercise,
        addSet,
        deleteSet,
        updateSet,
        clearWorkout,
    } = useWorkoutForm();
    const { setWorkoutInProgress } = useWorkoutInProgress();
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

    function handleCancelWorkout(): void {
        clearWorkout();
        setWorkoutInProgress(false);
        navigation.goBack();
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
            <Spacer size='spacing-3' />
            <Button status='danger' size='small' onPress={handleCancelWorkout}>
                Cancel Workout
            </Button>
        </PageView>
    );
}
