/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Button, H4, Input, View, XStack, YStack } from 'tamagui';

import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import WorkoutFormExercise from 'src/components/workout-tracker/WorkoutFormExercise';
import { useIsWorkoutInProgress } from 'src/context/workout-tracker/IsWorkoutInProgressContext';
import { RootState } from 'src/redux/Store';
import {
    clearWorkout,
    reorderExercises,
    updateName,
} from 'src/redux/workout-form/WorkoutFormSlice';

export default function WorkoutForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { setIsWorkoutInProgress } = useIsWorkoutInProgress();
    const workout = useSelector((state: RootState) => state.workoutForm.workout);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

    useEffect(() => {
        setBtnDisabled(!workout.name || workout.exercises.length === 0);
    }, [workout.name, workout.exercises]);

    function onAddExercisePress() {
        router.push('AddExercisesToWorkoutModal');
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
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView>
                <View flex={1} backgroundColor='$background' paddingHorizontal='$3'>
                    <XStack justifyContent='space-between' alignItems='center' marginTop='$3'>
                        <H4>0:00</H4>
                        <Button
                            backgroundColor={btnDisabled ? '$gray6' : '$green6'}
                            fontWeight='bold'
                            color={btnDisabled ? '$gray10' : '$green10'}
                            disabled={btnDisabled}
                        >
                            Finish Workout
                        </Button>
                    </XStack>
                    <Input
                        placeholder='Workout Name'
                        size='$5'
                        marginVertical='$4'
                        onChangeText={(text) => dispatch(updateName(text))}
                        value={workout.name}
                    />
                    <DraggableFlatList
                        containerStyle={{ flex: 1 }}
                        keyboardShouldPersistTaps='handled'
                        data={workout.exercises}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, getIndex, drag, isActive }) => (
                            <WorkoutFormExercise
                                id={item}
                                order={getIndex()! + 1}
                                drag={drag}
                                isActive={isActive}
                                isDragging={isDragging}
                                setIsDragging={setIsDragging}
                            />
                        )}
                        keyExtractor={(item) => item.toString()}
                        ListFooterComponent={renderListFooter}
                        onDragEnd={({ data }) => {
                            setIsDragging(false);
                            dispatch(reorderExercises(data));
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
