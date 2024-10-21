/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Button, H4, Input, Spinner, View, XStack, YStack } from 'tamagui';

import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IErrorResponse } from 'src/api/client';
import { ICreateWorkoutResponse } from 'src/api/workout-service/responses/ICreateWorkoutResponse';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import WorkoutFormExercise from 'src/components/workout-tracker/workout-form/WorkoutFormExercise';
import { useIsWorkoutInProgress } from 'src/context/workout-tracker/IsWorkoutInProgressContext';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';
import { useCreateWorkout } from 'src/hooks/workout-tracker/useCreateWorkout';
import { useStopwatch } from 'src/hooks/workout-tracker/useStopwatch';
import { RootState } from 'src/redux/Store';
import { updateTotalXP } from 'src/redux/user/UserSlice';
import { WORKOUT_FORM_STORAGE_KEY } from 'src/redux/workout-form/WorkoutFormMiddleware';
import {
    clearWorkout,
    reorderExercises,
    updateName,
} from 'src/redux/workout-form/WorkoutFormSlice';
import { formatStopwatchTime } from 'src/utils/FormatStopwatchTime';

interface WorkoutFormExerciseFunctionParams {
    item: string;
    drag: () => void;
    isActive: boolean;
    getIndex: () => number | undefined;
}

interface WorkoutFormExerciseFunctionParams {
    item: string;
    drag: () => void;
    isActive: boolean;
    getIndex: () => number | undefined;
}

export default function WorkoutForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { elapsedTime, clearStopwatch } = useStopwatch();
    const { setWorkoutInProgress } = useIsWorkoutInProgress();
    const workoutFormState = useSelector((state: RootState) => state.workoutForm);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
    const [validatedSets, setValidatedSets] = useState<string[]>([]);
    const { removeFromStorage } = useLocalStorage();
    const { createWorkout, isPending } = useCreateWorkout(
        onCreateWorkoutSuccess,
        onCreateWorkoutError
    );

    useEffect(() => {
        setBtnDisabled(
            !workoutFormState.workout.name || workoutFormState.workout.exercises.length === 0
        );
    }, [workoutFormState.workout.name, workoutFormState.workout.exercises]);

    function onAddExercisePress() {
        router.push({
            pathname: '/workout-tracker/workout-form/AddExercisesToWorkoutModal',
            params: { workoutOrTemplate: 'Workout' },
        });
    }

    function resetWorkout() {
        removeFromStorage(WORKOUT_FORM_STORAGE_KEY)
            .then(() => {
                dispatch(clearWorkout());
            })
            .catch((e) => console.log(e));
        setWorkoutInProgress(false);
        clearStopwatch();
    }

    function onFinishWorkoutPress() {
        // Adds sets that are invalid in workout to state so newly added sets don't have red background
        const newValidatedSets = Object.keys(workoutFormState.sets)
            .filter(
                (setId) =>
                    !workoutFormState.sets[setId].weight || !workoutFormState.sets[setId].reps
            )
            .map((setId) => workoutFormState.sets[setId].id);
        setValidatedSets(newValidatedSets);
        displayFinishWorkoutAlert(newValidatedSets);
    }

    function displayFinishWorkoutAlert(newValidatedSets: string[]) {
        if (
            newValidatedSets.length === Object.keys(workoutFormState.sets).length ||
            !Object.keys(workoutFormState.sets).length
        ) {
            onCancelWorkoutPress();
        } else if (!newValidatedSets.length) {
            Alert.alert('Finish Workout?', '', [
                {
                    style: 'cancel',
                    text: 'Close',
                },
                {
                    style: 'default',
                    text: 'Finish',
                    onPress: () =>
                        createWorkout({ workoutForm: workoutFormState, duration: elapsedTime }),
                },
            ]);
        } else {
            Alert.alert('Finish Workout?', 'Any invalid sets and exercises will be removed.', [
                {
                    style: 'cancel',
                    text: 'Close',
                },
                {
                    style: 'default',
                    text: 'Finish',
                    onPress: () =>
                        createWorkout({ workoutForm: workoutFormState, duration: elapsedTime }),
                },
            ]);
        }
    }

    function onCancelWorkoutPress() {
        Alert.alert(
            'Cancel Workout?',
            'This will clear the current workout. This cannot be undone.',
            [
                {
                    style: 'cancel',
                    text: 'Resume',
                },
                {
                    style: 'destructive',
                    text: 'Cancel Workout',
                    onPress: () => {
                        router.back();
                        resetWorkout();
                    },
                },
            ]
        );
    }

    function onCreateWorkoutSuccess(response: ICreateWorkoutResponse) {
        resetWorkout();
        router.push({
            pathname: 'workout-tracker/workout-form/PostWorkoutSummary',
            params: {
                xpGainedFromWeeklyGoal: response.workoutStats.xpGainedFromWeeklyGoal.toString(),
                totalGainedXp: response.workoutStats.totalGainedXp.toString(),
                totalUserXp: response.workoutStats.totalUserXp.toString(),
            },
        });
        dispatch(updateTotalXP(response.workoutStats.totalUserXp));
    }

    function onCreateWorkoutError(error: IErrorResponse) {
        if (error.statusCode === 400) {
            Alert.alert('Error creating workout.', error.message[0]);
        } else {
            Alert.alert('Error creating workout.', error.message);
        }
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

    const renderExercise = ({
        item,
        getIndex,
        drag,
        isActive,
    }: WorkoutFormExerciseFunctionParams) => (
        <WorkoutFormExercise
            id={item}
            order={getIndex()! + 1}
            drag={drag}
            isActive={isActive}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            validatedSets={validatedSets}
        />
    );

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <KeyboardAvoidingView>
                <View flex={1} backgroundColor='$background' paddingHorizontal='$3'>
                    <XStack justifyContent='space-between' alignItems='center' marginTop='$3'>
                        <H4>{formatStopwatchTime(elapsedTime)}</H4>
                        <Button
                            backgroundColor={btnDisabled ? '$gray6' : '$green6'}
                            fontWeight='bold'
                            color={btnDisabled ? '$gray10' : '$green10'}
                            disabled={btnDisabled}
                            onPress={onFinishWorkoutPress}
                        >
                            {isPending ? <Spinner /> : 'Finish Workout'}
                        </Button>
                    </XStack>
                    <Input
                        placeholder='Workout Name'
                        size='$5'
                        marginVertical='$4'
                        onChangeText={(text) => dispatch(updateName(text))}
                        value={workoutFormState.workout.name}
                    />
                    <DraggableFlatList
                        containerStyle={{ flex: 1 }}
                        keyboardShouldPersistTaps='handled'
                        data={workoutFormState.workout.exercises}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={7}
                        renderItem={renderExercise}
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
