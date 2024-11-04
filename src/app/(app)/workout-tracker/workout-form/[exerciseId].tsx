import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import { exerciseWorkoutHistoryQueryKey } from 'src/api/exercise-service/ExerciseApiConfig';
import { getExerciseWorkoutHistory } from 'src/api/exercise-service/ExerciseApiService';
import { IconBtn } from 'src/components/common/icon-btn';
import { PopoverMenuV2 } from 'src/components/common/popover-menu-v2';
import WorkoutHistory from 'src/components/workout-tracker/workout-form/exercise-details/WorkoutHistory';
import { H3, H4, SizableText, Spinner, View, XStack } from 'tamagui';

export default function ExerciseDetails() {
    const { exerciseId, exerciseName } = useLocalSearchParams<{
        exerciseId: string;
        exerciseName: string;
    }>();
    const {
        data: workoutHistory,
        isLoading,
        error,
    } = useQuery({
        queryFn: async () => await getExerciseWorkoutHistory(exerciseId),
        queryKey: exerciseWorkoutHistoryQueryKey(exerciseId),
        staleTime: Infinity,
    });

    function renderBody() {
        if (isLoading) {
            return <Spinner />;
        }

        if (error) {
            return (
                <SizableText color='$red10'>Error getting exercise: {error.message}</SizableText>
            );
        }

        if (!workoutHistory?.length) {
            return <SizableText>No past workouts to display</SizableText>;
        }

        return (
            <View>
                <H4>History</H4>
                <FlatList
                    data={workoutHistory}
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
                <IconBtn onPress={() => router.back()} icon='close-outline' />
                <H3 flex={1} textAlign='center' numberOfLines={1}>
                    {exerciseName}
                </H3>
                <PopoverMenuV2 height='20%' options={[]} />
            </XStack>
            {renderBody()}
        </View>
    );
}
