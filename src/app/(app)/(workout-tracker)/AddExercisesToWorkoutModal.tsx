import { useRouter } from 'expo-router';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/Store';
import { addExercisesToWorkout } from 'src/redux/workout-form/WorkoutFormSlice';
import { Button, H4, Input, Separator, SizableText, View, XStack, YStack } from 'tamagui';

export interface IExercise {
    id: string;
    name: string;
    bodyPart: string;
}

export default function AddExercisesToWorkoutModal() {
    const exerciseIdsInWorkout = useSelector(
        (state: RootState) => state.workoutForm.workout.exercises
    );
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const router = useRouter();
    const dispatch = useDispatch();

    function onAddToWorkoutPress() {
        dispatch(
            addExercisesToWorkout({
                selectedExerciseIds: selectedExercises,
                allExercises: exerciseData,
            })
        );
        router.back();
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
            />
            <FlatList
                data={exerciseData}
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
        </View>
    );
}

interface Props {
    exercise: IExercise;
    setSelectedExercises: Dispatch<SetStateAction<string[]>>;
    isSelected: boolean;
    isAlreadyInWorkout: boolean;
}
function Exercise({ exercise, setSelectedExercises, isSelected, isAlreadyInWorkout }: Props) {
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
}

const exerciseData = [
    { id: '1', name: 'Exercise 1', bodyPart: 'chest' },
    { id: '2', name: 'Exercise 2', bodyPart: 'arms' },
    { id: '3', name: 'Exercise 3', bodyPart: 'shoulders' },
    { id: '4', name: 'Exercise 4', bodyPart: 'chest' },
    { id: '5', name: 'Exercise 5', bodyPart: 'chest' },
    { id: '6', name: 'Exercise 6', bodyPart: 'chest' },
    { id: '7', name: 'Exercise 7', bodyPart: 'chest' },
    { id: '8', name: 'Exercise 8', bodyPart: 'chest' },
    { id: '9', name: 'Exercise 9', bodyPart: 'chest' },
    { id: '10', name: 'Exercise 10', bodyPart: 'chest' },
    { id: '11', name: 'Exercise 11', bodyPart: 'chest' },
];
