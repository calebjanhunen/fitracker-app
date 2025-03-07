import { useRouter } from 'expo-router';
import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { ExerciseResponseDto } from 'src/api/generated';
import { useGetExercisesForWorkout } from 'src/api/hooks';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import { CreateExerciseModal } from 'src/components/exercises';
import { RootState } from 'src/redux/Store';
import { addExercisesToWorkout } from 'src/redux/workout-form/WorkoutFormSlice';
import { Button, Input, Separator, SizableText, Spinner, XStack, YStack } from 'tamagui';

export default function AddExercisesToWorkout() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const [exerciseSearchQuery, setExerciseSearchQuery] = useState<string>('');
    const exerciseIdsInWorkout = useSelector(
        (state: RootState) => state.workoutForm.workout.exercises
    );
    const { data: exercises, isLoading, error } = useGetExercisesForWorkout();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function onAddToWorkoutOrTemplatePress() {
        if (!exercises) return;

        dispatch(
            addExercisesToWorkout({
                selectedExerciseIds: selectedExercises,
                allExercises: exercises,
            })
        );
        router.back();
    }

    function onCancelPress() {
        setSelectedExercises([]);
        router.back();
    }

    function onCreateExerciseSuccess(createdExerciseId: string) {
        setSelectedExercises((prev) => [...prev, createdExerciseId]);
    }

    function renderBody() {
        if (error) {
            return (
                <YStack alignItems='center'>
                    <SizableText color='$red10' fontWeight='bold'>
                        Error getting exercises: {error.message}
                    </SizableText>
                    <SizableText color='$red10' fontWeight='bold'>
                        Error Code: {error.statusCode}
                    </SizableText>
                </YStack>
            );
        }
        if (isLoading) {
            return <Spinner />;
        }
        if (exercises) {
            const filteredExercises = exerciseSearchQuery
                ? exercises.filter((e) =>
                      e.name.toLowerCase().includes(exerciseSearchQuery.toLowerCase())
                  )
                : exercises;
            return (
                <FlatList
                    data={filteredExercises}
                    keyboardShouldPersistTaps='handled'
                    renderItem={({ item }) => (
                        <Exercise
                            exercise={item}
                            setSelectedExercises={setSelectedExercises}
                            isSelected={selectedExercises.includes(item.id)}
                            isAlreadyInForm={exerciseIdsInWorkout.includes(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <Separator borderColor='$gray10' />}
                />
            );
        } else {
            return <SizableText>No Exercises to display</SizableText>;
        }
    }

    return (
        <>
            <CreateExerciseModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onCreateSuccess={onCreateExerciseSuccess}
            />
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <KeyboardAvoidingView>
                    <XStack
                        alignItems='center'
                        justifyContent='space-between'
                        marginHorizontal='$space.3'
                        marginBottom='$space.3'
                    >
                        <Button
                            fontWeight='bold'
                            paddingHorizontal='$2'
                            paddingVertical='$1'
                            height='auto'
                            onPress={onCancelPress}
                            backgroundColor='$gray8'
                        >
                            X
                        </Button>
                        <Button
                            backgroundColor={selectedExercises.length === 0 ? '$gray6' : '$green6'}
                            color={selectedExercises.length === 0 ? '$gray11' : '$green11'}
                            fontWeight='bold'
                            disabled={selectedExercises.length === 0}
                            onPress={onAddToWorkoutOrTemplatePress}
                        >
                            Add to Workout
                        </Button>
                    </XStack>
                    <Button
                        marginHorizontal='$space.3'
                        marginBottom='$space.4'
                        size='$2'
                        backgroundColor='$blue6'
                        color='$blue10'
                        fontWeight='bold'
                        onPress={() => setIsModalOpen(true)}
                    >
                        Create Exercise
                    </Button>
                    <Input
                        placeholder='Search for Exercise'
                        marginBottom='$2'
                        marginHorizontal='$space.3'
                        size='$5'
                        onChangeText={setExerciseSearchQuery}
                    />
                    {renderBody()}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

interface Props {
    exercise: ExerciseResponseDto;
    setSelectedExercises: Dispatch<SetStateAction<string[]>>;
    isSelected: boolean;
    isAlreadyInForm: boolean;
}
const Exercise = memo(function Exercise({
    exercise,
    setSelectedExercises,
    isSelected,
    isAlreadyInForm,
}: Props) {
    function onExercisePress() {
        if (isAlreadyInForm) {
            return;
        }
        setSelectedExercises((prev) => {
            if (prev.includes(exercise.id)) {
                return prev.filter((id) => id !== exercise.id);
            } else {
                return [...prev, exercise.id];
            }
        });
    }

    const backgroundColor = isAlreadyInForm ? '$gray6' : isSelected ? '$blue6' : '$color4';
    return (
        <XStack
            onPress={onExercisePress}
            justifyContent='space-between'
            alignItems='flex-end'
            paddingHorizontal='$4'
            paddingVertical='$space.2'
            backgroundColor={backgroundColor}
        >
            <YStack flex={1}>
                <SizableText size='$6' fontWeight='bold'>
                    {exercise.name} ({exercise.equipment})
                </SizableText>
                <SizableText color='$gray10'>{exercise.bodyPart}</SizableText>
            </YStack>
            <SizableText>
                {exercise.numTimesUsed} {exercise.numTimesUsed === 1 ? 'use' : 'uses'}
            </SizableText>
        </XStack>
    );
});
