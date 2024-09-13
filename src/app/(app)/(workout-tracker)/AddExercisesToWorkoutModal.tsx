import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IErrorResponse } from 'src/api/client';
import { GET_EXERCISES_QUERY_KEY } from 'src/api/exercise-service/ExerciseApiConfig';
import { getAllExercises } from 'src/api/exercise-service/ExerciseApiService';
import { IExerciseResponse } from 'src/api/exercise-service/interfaces/responses/ExerciseResponse';
import { RootState } from 'src/redux/Store';
import { addExercisesToWorkout } from 'src/redux/workout-form/WorkoutFormSlice';
import { Button, H4, Input, Separator, SizableText, Spinner, View, XStack, YStack } from 'tamagui';

export default function AddExercisesToWorkoutModal() {
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
    } = useQuery<IExerciseResponse[], IErrorResponse>({
        queryKey: [GET_EXERCISES_QUERY_KEY],
        queryFn: getAllExercises,
        refetchOnMount: false,
        retry: false,
    });

    function onAddToWorkoutPress() {
        if (!exercises) return;

        dispatch(
            addExercisesToWorkout({
                selectedExerciseIds: selectedExercises,
                allExercises: exercises,
            })
        );
        router.back();
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
                            isAlreadyInWorkout={exerciseIdsInWorkout.includes(item.id)}
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
        <View paddingTop='$3' flex={1}>
            <Button
                backgroundColor={selectedExercises.length === 0 ? '$gray6' : '$green6'}
                color={selectedExercises.length === 0 ? '$gray11' : '$green11'}
                fontWeight='bold'
                marginHorizontal='$space.3'
                marginBottom='$space.3'
                disabled={selectedExercises.length === 0}
                onPress={onAddToWorkoutPress}
            >
                Add to Workout
            </Button>
            <Input
                placeholder='Search for Exercise'
                marginBottom='$2'
                marginHorizontal='$space.3'
                size='$5'
                onChangeText={setExerciseSearchQuery}
            />
            {renderBody()}
        </View>
    );
}

interface Props {
    exercise: IExerciseResponse;
    setSelectedExercises: Dispatch<SetStateAction<string[]>>;
    isSelected: boolean;
    isAlreadyInWorkout: boolean;
}
const Exercise = memo(function Exercise({
    exercise,
    setSelectedExercises,
    isSelected,
    isAlreadyInWorkout,
}: Props) {
    function onExercisePress() {
        if (isAlreadyInWorkout) {
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

    const backgroundColor = isAlreadyInWorkout ? '$gray6' : isSelected ? '$blue6' : '$color4';
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
            <SizableText>23</SizableText>
        </XStack>
    );
});
