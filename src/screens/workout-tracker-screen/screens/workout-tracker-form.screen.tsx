/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect, useState } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';
import { Button, Input } from '@ui-kitten/components';
import { ActivityIndicator, View } from 'react-native';
import DraggableFlatList, {
    type DragEndParams,
    type RenderItemParams,
} from 'react-native-draggable-flatlist';

import { Spacer } from 'src/components';
import { useCreateWorkout } from 'src/hooks/api/workouts/useCreateWorkout';
import { useKeyboard } from 'src/hooks/useKeyboard';
import { useWorkoutForm } from 'src/hooks/useWorkoutForm';
import { useWorkoutInProgress } from 'src/hooks/useWorkoutInProgress';
import type { WorkoutFormExercise } from 'src/interfaces/workout-form';
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
        reorderExercises,
    } = useWorkoutForm();
    const { createWorkout, isSaving } = useCreateWorkout();
    const { setWorkoutInProgress } = useWorkoutInProgress();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingRight: 16,
                    }}
                >
                    <Button
                        size='small'
                        status='success'
                        onPress={() => handleFinishWorkout()}
                        disabled={isSaving}
                    >
                        {isSaving ? <ActivityIndicator /> : 'Finish Workout'}
                    </Button>
                </View>
            ),
        });
    }, [navigation, workout, isSaving]);

    const { keyboardHeight } = useKeyboard();

    const renderExercise = ({
        item,
        drag,
        isActive,
    }: RenderItemParams<WorkoutFormExercise>): React.ReactElement => (
        <ExerciseComponent
            exercise={item}
            deleteExercise={deleteExercise}
            addSet={addSet}
            deleteSet={deleteSet}
            updateSet={updateSet}
            drag={drag}
            isActive={isActive}
        />
    );
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
            <Spacer size='spacing-8' />
            <Spacer size='spacing-8' />
        </View>
    );

    function handleCancelWorkout(): void {
        clearWorkout();
        setWorkoutInProgress(false);
        navigation.goBack();
    }

    function handleFinishWorkout(): void {
        createWorkout(workout);
    }

    function handleDragEnd({ data }: DragEndParams<WorkoutFormExercise>): void {
        reorderExercises(data);
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <AddExerciseModal
                visible={modalVisible}
                setVisible={setModalVisible}
                addExercises={addExercises}
                exercisesInWorkout={workout.exercises}
            />
            <View style={{ paddingHorizontal: 16 }}>
                <Input
                    placeholder='Enter Workout Name'
                    onChangeText={updateWorkoutName}
                    value={workout.name}
                />
            </View>
            <Spacer size='spacing-4' />
            <DraggableFlatList
                style={{ backgroundColor: 'transparent', paddingHorizontal: 16 }}
                data={workout.exercises}
                renderItem={renderExercise}
                keyExtractor={(item) => item.id}
                ListFooterComponent={renderListFooter}
                onDragEnd={handleDragEnd}
            />
        </View>
    );
}
