/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useState } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';
import { Button, Input, List } from '@ui-kitten/components';
import { View } from 'react-native';

import { Spacer } from 'src/components';
import { useKeyboard } from 'src/hooks/useKeyboard';
import { useWorkoutForm } from 'src/hooks/useWorkoutForm';
import { useWorkoutInProgress } from 'src/hooks/useWorkoutInProgress';
import { type ExerciseInWorkout } from 'src/interfaces/workout';
import { type WorkoutTrackerStackParamList } from 'src/navigation/workout-tracker-navigation';
import AddExerciseModal from '../components/add-exercise-modal/add-exercise-modal';
import ExerciseComponent from '../components/workout-tracker-form/exercise-component';

type Props = StackScreenProps<WorkoutTrackerStackParamList, 'WorkoutTrackerForm'>;

export default function WorkoutTrackerFormScreen({ navigation }: Props): React.ReactElement {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
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
    const { keyboardHeight } = useKeyboard();
    const renderListFooter = (): React.ReactElement => (
        <View>
            <Spacer size='spacing-8' />
            <Button size='small' onPress={() => setModalVisible(true)}>
                Add Exercise
            </Button>
            <Spacer size='spacing-3' />
            <Button status='danger' size='small' onPress={handleCancelWorkout}>
                Cancel Workout
            </Button>
            <Spacer size='spacing-3' />
            <View style={{ height: keyboardHeight }} />
        </View>
    );
    // console.log(JSON.stringify(workout, null, 2));

    function handleCancelWorkout(): void {
        clearWorkout();
        setWorkoutInProgress(false);
        navigation.goBack();
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <AddExerciseModal
                visible={modalVisible}
                setVisible={setModalVisible}
                addExercises={addExercises}
            />
            <View style={{ paddingHorizontal: 16 }}>
                <Input
                    placeholder='Enter Workout Name'
                    onChangeText={updateWorkoutName}
                    value={workout.name}
                />
            </View>
            <Spacer size='spacing-4' />
            <List
                style={{ backgroundColor: 'transparent', paddingHorizontal: 16 }}
                data={workout.exercises}
                renderItem={renderExercise}
                ItemSeparatorComponent={() => <Spacer size='spacing-5' />}
                ListFooterComponent={renderListFooter}
            />
        </View>
    );
}
