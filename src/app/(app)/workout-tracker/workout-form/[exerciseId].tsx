import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, FlatList } from 'react-native';
import { exerciseDetailsQueryKey } from 'src/api/exercise-service/ExerciseApiConfig';
import { getExerciseDetails } from 'src/api/exercise-service/ExerciseApiService';
import { Button } from 'src/components/common/button';
import { IconBtn } from 'src/components/common/icon-btn';
import WorkoutHistory from 'src/components/workout-tracker/workout-form/exercise-details/WorkoutHistory';
import { useEditExerciseModal } from 'src/context/workout-tracker/EditExerciseModalContext';
import { H3, H4, SizableText, Spinner, useTheme, View, XStack } from 'tamagui';

export default function ExerciseDetails() {
    const theme = useTheme();
    const { setIsModalOpen, setRouteToNavigateBackTo, setExerciseToEdit } = useEditExerciseModal();
    const { exerciseId, exerciseName } = useLocalSearchParams<{
        exerciseId: string;
        exerciseName: string;
    }>();
    const {
        data: exerciseDetails,
        isLoading,
        error,
    } = useQuery({
        queryFn: async () => await getExerciseDetails(exerciseId),
        queryKey: exerciseDetailsQueryKey(exerciseId),
        staleTime: Infinity,
    });

    function onOpenEditExerciseModalPress() {
        if (!exerciseDetails) {
            Alert.alert('Error getting exercise details');
            return null;
        }
        router.back();
        setRouteToNavigateBackTo('/workout-tracker/workout-form');
        setExerciseToEdit(exerciseDetails);
        setTimeout(() => setIsModalOpen(true), 150);
    }

    function renderBody() {
        if (isLoading) {
            return <Spinner />;
        }

        if (error) {
            return (
                <SizableText color='$red10'>Error getting exercise: {error.message}</SizableText>
            );
        }

        if (!exerciseDetails?.workoutHistory?.length) {
            return <SizableText>No past workouts to display</SizableText>;
        }

        return (
            <View>
                <H4>History</H4>
                <FlatList
                    data={exerciseDetails.workoutHistory}
                    renderItem={({ item }) => <WorkoutHistory workout={item} />}
                    ItemSeparatorComponent={() => <View height='$space.3' />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }

    return (
        <View flex={1} paddingTop='$space.5' paddingHorizontal='$space.4'>
            <XStack justifyContent='space-between' alignItems='center' marginBottom='$space.3'>
                <IconBtn
                    backgroundColor={theme.gray7.val}
                    onPress={() => router.back()}
                    icon='close-outline'
                />
                <H3 flex={1} textAlign='center' numberOfLines={1}>
                    {exerciseName}
                </H3>
                <Button
                    backgroundColor='$blue6'
                    color='$blue10'
                    // disabled={!exerciseDetails?.isCustom}
                    onPress={onOpenEditExerciseModalPress}
                >
                    Edit
                </Button>
            </XStack>
            {renderBody()}
        </View>
    );
}
