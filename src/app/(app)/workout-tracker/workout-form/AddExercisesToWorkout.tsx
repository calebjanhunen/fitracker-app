import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { IErrorResponse } from 'src/api/client';
import { GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY } from 'src/api/exercise-service/ExerciseApiConfig';
import { getExercisesWithWorkoutDetails } from 'src/api/exercise-service/ExerciseApiService';
import { IExerciseWithWorkoutDetailsResponse } from 'src/api/exercise-service/interfaces/responses/ExerciseResponse';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import CreateExerciseModal from 'src/components/workout-tracker/common/CreateExerciseModal';
import { RootState } from 'src/redux/Store';
import { addExercisesToWorkout } from 'src/redux/workout-form/WorkoutFormSlice';
import {
    Button,
    Dialog,
    H4,
    Input,
    Separator,
    SizableText,
    Spinner,
    XStack,
    YStack,
} from 'tamagui';

export default function AddExercisesToWorkout() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const [exerciseSearchQuery, setExerciseSearchQuery] = useState<string>('');
    const exerciseIdsInWorkout = useSelector(
        (state: RootState) => state.workoutForm.workout.exercises
    );
    const {
        data: exercises,
        isLoading,
        error,
    } = useQuery<IExerciseWithWorkoutDetailsResponse[], IErrorResponse>({
        queryKey: [GET_EXERCISES_WITH_WORKOUT_DETAILS_QUERY_KEY],
        queryFn: getExercisesWithWorkoutDetails,
        staleTime: Infinity,
        gcTime: Infinity,
    });

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

    const [isModalOpen, setIsModelOpen] = useState<boolean>(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                <Dialog modal open={isModalOpen} onOpenChange={setIsModelOpen}>
                    <Dialog.Trigger asChild>
                        <Button
                            marginHorizontal='$space.3'
                            marginBottom='$space.4'
                            size='$2'
                            backgroundColor='$blue6'
                            color='$blue10'
                            fontWeight='bold'
                        >
                            Create Exercise
                        </Button>
                    </Dialog.Trigger>
                    <CreateExerciseModal
                        isOpen={isModalOpen}
                        setIsOpen={setIsModelOpen}
                        setSelectedExercises={onCreateExerciseSuccess}
                    />
                </Dialog>
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
    );
}

interface Props {
    exercise: IExerciseWithWorkoutDetailsResponse;
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
            paddingHorizontal='$6'
            paddingVertical='$space.2'
            backgroundColor={backgroundColor}
        >
            <YStack>
                <H4>{exercise.name}</H4>
                <SizableText>{exercise.bodyPart}</SizableText>
            </YStack>
            <SizableText>{exercise.numTimesUsed}</SizableText>
        </XStack>
    );
});
