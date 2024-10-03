/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, View, XStack, YStack } from 'tamagui';

import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import WorkoutFormExercise from 'src/components/workout-tracker/WorkoutFormExercise';
import { RootState } from 'src/redux/Store';
import { reorderExercises, updateName } from 'src/redux/workout-form/WorkoutFormSlice';
import { clearWorkoutTemplate } from 'src/redux/workout-template-form/WorkoutTemplateFormSlice';

export default function WorkoutTemplateForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const workoutTemplateFormState = useSelector((state: RootState) => state.workoutTemplateForm);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

    useEffect(() => {
        const nameValid = !workoutTemplateFormState.workoutTemplate.name;
        const exercisesValid = !workoutTemplateFormState.workoutTemplate.exercises.length;
        let setsValid = true;
        Object.keys(workoutTemplateFormState.exercises).forEach(
            (id) => (setsValid = !!workoutTemplateFormState.exercises[id].sets.length)
        );

        setBtnDisabled(!nameValid || exercisesValid || setsValid);
    }, [
        workoutTemplateFormState.workoutTemplate.name,
        workoutTemplateFormState.workoutTemplate.exercises,
    ]);

    function onAddExercisePress() {
        router.push({
            pathname: 'AddExercisesToWorkoutModal',
            params: { workoutOrTemplate: 'Template' },
        });
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
                    <XStack justifyContent='space-between' alignItems='center' marginTop='$3'>
                        <Button
                            backgroundColor={btnDisabled ? '$gray6' : '$green6'}
                            fontWeight='bold'
                            color={btnDisabled ? '$gray10' : '$green10'}
                            disabled={btnDisabled}
                            onPress={() => {}}
                        >
                            Create Workout Template
                        </Button>
                    </XStack>
                    <Input
                        placeholder='Workout Name'
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
