/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Spinner, View, YStack } from 'tamagui';

import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IErrorResponse } from 'src/api/client';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import WorkoutTemplateFormExercise from 'src/components/workout-tracker/workout-template-form/WorkoutTemplateFormExercise';
import { useCreateWorkoutTemplate } from 'src/hooks/workout-tracker/workout-template-form/useCreateWorkoutTemplate';
import { RootState } from 'src/redux/Store';
import {
    clearWorkoutTemplate,
    reorderExercises,
    updateName,
} from 'src/redux/workout-template-form/WorkoutTemplateFormSlice';

export default function WorkoutTemplateForm() {
    const workoutTemplateFormState = useSelector((state: RootState) => state.workoutTemplateForm);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const createBtnDisabled = isBtnDisabled();
    const { createWorkoutTemplate, isPending } = useCreateWorkoutTemplate(
        onCreateTemplateSuccess,
        onCreateTemplateError
    );
    const dispatch = useDispatch();
    const router = useRouter();

    function isBtnDisabled() {
        if (workoutTemplateFormState.workoutTemplate.name.trim() === '') return true;
        if (!workoutTemplateFormState.workoutTemplate.exercises.length) return true;

        let setsValid = true;
        Object.keys(workoutTemplateFormState.exercises).forEach(
            (id) => (setsValid = !!workoutTemplateFormState.exercises[id].sets.length)
        );
        return !setsValid;
    }

    function onCreateTemplateSuccess() {
        dispatch(clearWorkoutTemplate());
        router.back();
    }

    function onCreateTemplateError(error: IErrorResponse) {
        if (error.statusCode === 400) {
            Alert.alert('Error creating workout.', error.message[0]);
        } else {
            Alert.alert('Error creating workout.', error.message);
        }
    }

    const renderListFooter = () => (
        <YStack gap='$3' marginTop='$space.5'>
            <Link href='workout-tracker/workout-template-form/AddExercisesToTemplate'>
                <Button backgroundColor='$blue6' color='$blue10' fontWeight='bold' size='$3'>
                    Add Exercise
                </Button>
            </Link>
            <Button
                onPress={() => {
                    dispatch(clearWorkoutTemplate());
                    router.back();
                }}
                backgroundColor='$red6'
                color='$red10'
                fontWeight='bold'
                size='$3'
            >
                Cancel Template Creation
            </Button>
        </YStack>
    );

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <KeyboardAvoidingView>
                <View flex={1} backgroundColor='$background' paddingHorizontal='$3'>
                    <Button
                        backgroundColor={createBtnDisabled ? '$gray6' : '$green6'}
                        fontWeight='bold'
                        color={createBtnDisabled ? '$gray10' : '$green10'}
                        disabled={createBtnDisabled}
                        onPress={() => createWorkoutTemplate(workoutTemplateFormState)}
                    >
                        {isPending ? <Spinner /> : 'Create Workout Template'}
                    </Button>
                    <Input
                        placeholder='Workout Template Name'
                        size='$5'
                        marginVertical='$4'
                        onChangeText={(text) => dispatch(updateName(text))}
                        value={workoutTemplateFormState.workoutTemplate.name}
                    />
                    <DraggableFlatList
                        containerStyle={{ flex: 1 }}
                        keyboardShouldPersistTaps='handled'
                        data={workoutTemplateFormState.workoutTemplate.exercises}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, getIndex, drag, isActive }) => (
                            <WorkoutTemplateFormExercise
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
