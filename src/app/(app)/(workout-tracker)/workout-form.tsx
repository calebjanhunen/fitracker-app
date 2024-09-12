import React from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, View, YStack } from 'tamagui';

import { useRouter } from 'expo-router';
import WorkoutFormExercise from 'src/components/workout-tracker/workout-form-exercise';
import { useIsWorkoutInProgress } from 'src/context/workout-tracker/IsWorkoutInProgressContext';
import { RootState } from 'src/redux/Store';
import { addExercise, clearWorkout, updateName } from 'src/redux/workout-form/WorkoutFormSlice';

export default function WorkoutForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { setIsWorkoutInProgress } = useIsWorkoutInProgress();
    const workout = useSelector((state: RootState) => state.workoutForm.workout);

    function onAddExercisePress() {
        dispatch(
            addExercise({
                id: Date.now().toString(),
                name: 'Test Exercise',
                sets: [],
            })
        );
    }

    function onCancelWorkoutPress() {
        setIsWorkoutInProgress(false);
        dispatch(clearWorkout());
        router.back();
    }

    const renderListFooter = () => (
        <YStack gap='$3' marginTop='$space.5'>
            <Button
                onPress={onAddExercisePress}
                backgroundColor='$blue6'
                color='$blue10'
                fontWeight='bold'
                size='$3'
            >
                Add Exercise
            </Button>
            <Button
                onPress={onCancelWorkoutPress}
                backgroundColor='$red6'
                color='$red10'
                fontWeight='bold'
                size='$3'
            >
                Cancel Workout
            </Button>
        </YStack>
    );

    return (
        <View flex={1} backgroundColor='$background' paddingHorizontal='$3'>
            <Input
                placeholder='Workout Name'
                size='$5'
                marginVertical='$4'
                onChangeText={(text) => dispatch(updateName(text))}
                value={workout.name}
            />
            <KeyboardAwareFlatList
                keyboardShouldPersistTaps='handled'
                data={workout.exercises}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <WorkoutFormExercise id={item} order={index + 1} />
                )}
                keyExtractor={(item) => item.toString()}
                ListFooterComponent={renderListFooter}
            />
        </View>
    );
}
