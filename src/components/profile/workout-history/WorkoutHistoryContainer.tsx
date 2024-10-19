import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { IErrorResponse } from 'src/api/client';
import { IWorkoutResponse } from 'src/api/workout-service/responses/IWorkoutResponse';
import { GET_ALL_WORKOUTS_QUERY_KEY } from 'src/api/workout-service/WorkoutApiConfig';
import * as WorkoutApi from 'src/api/workout-service/WorkoutApiService';
import { SizableText, Spinner, View } from 'tamagui';
import WorkoutHistoryCard from './WorkoutHistoryCard';

export default function WorkoutHistoryContainer() {
    const {
        data: workouts,
        isLoading,
        error,
        isSuccess,
    } = useQuery<IWorkoutResponse[], IErrorResponse>({
        queryFn: WorkoutApi.getAllWorkouts,
        queryKey: [GET_ALL_WORKOUTS_QUERY_KEY],
        staleTime: Infinity,
        gcTime: Infinity,
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <SizableText fontWeight='bold' color='$red10' textAlign='center'>
                {error.message}
            </SizableText>
        );
    }

    if (isSuccess && !workouts.length) {
        return (
            <SizableText textAlign='center' paddingTop='$space.3' fontWeight='bold'>
                You have not completed any workouts
            </SizableText>
        );
    }
    return (
        <View paddingTop='$space.2'>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={workouts}
                renderItem={({ item }) => <WorkoutHistoryCard workout={item} />}
                ItemSeparatorComponent={() => <View height='$1' />}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
            />
        </View>
    );
}
