import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { ExerciseWithWorkoutDetailsDto } from 'src/api/generated';
import { useGetExercisesWithWorkoutDetails } from 'src/api/hooks';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import CreateExerciseModal from 'src/components/workout-tracker/common/CreateExerciseModal';
import { RootState } from 'src/redux/Store';
import { replaceExercise } from 'src/redux/workout-template-form/WorkoutTemplateFormSlice';
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

export default function ReplaceExercise() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const [exerciseSearchQuery, setExerciseSearchQuery] = useState<string>('');
    const exerciseIdsInWorkout = useSelector(
        (state: RootState) => state.workoutForm.workout.exercises
    );
    const { oldExerciseId } = useLocalSearchParams<{ oldExerciseId: string }>();
    const { data: exercises, isLoading, error } = useGetExercisesWithWorkoutDetails();

    function onReplaceExercisePress() {
        if (!exercises) {
            return;
        }
        const newExercise = exercises.find((e) => e.id === selectedExercises[0]);
        if (!newExercise) {
            return;
        }
        dispatch(replaceExercise({ oldExerciseId, newExercise }));
        router.back();
    }

    function onCancelPress() {
        setSelectedExercises([]);
        router.back();
    }

    function onCreateExerciseSuccess(createdExerciseId: string) {
        setSelectedExercises([createdExerciseId]);
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
                        height='0'
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
                        onPress={onReplaceExercisePress}
                    >
                        Replace Exercise
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
    exercise: ExerciseWithWorkoutDetailsDto;
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
        setSelectedExercises([exercise.id]);
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
