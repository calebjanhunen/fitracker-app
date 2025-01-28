import React from 'react';

import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Alert } from 'react-native';
import { H3, SizableText, useTheme, View, XStack } from 'tamagui';

import { FlatList } from 'react-native-gesture-handler';
import { IErrorResponse } from 'src/api/client';
import { useDeleteWorkout, useGetWorkoutDetails } from 'src/api/hooks';
import { IconBtn } from 'src/components/common/icon-btn';
import Exercise from 'src/components/profile/workout-details/Exercise';
import TimeAndDateInfo from 'src/components/profile/workout-details/TimeAndDateInfo';

export default function WorkoutDetailsModal() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>();
    const { deleteWorkout, isDeleting } = useDeleteWorkout(() => {}, onDeleteError);
    const { data: workout, isLoading, error } = useGetWorkoutDetails(workoutId);
    const theme = useTheme();

    function onDeletePress() {
        if (!workout) {
            return;
        }
        Alert.alert(
            `Are you sure you want to delete ${workout.name}?`,
            'This will remove the xp gained from completing the workout.',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => deleteWorkout(workout.id),
                    style: 'destructive',
                },
            ]
        );
    }

    function onDeleteError(error: IErrorResponse) {
        Alert.alert('Could not delete workout', error.message);
    }

    if (isLoading) {
        return (
            <View flex={1} alignItems='center' justifyContent='center'>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    if (error || !workout) {
        return (
            <View flex={1} alignItems='center' justifyContent='center'>
                <SizableText fontWeight='bold' color='$red10'>
                    Error getting workout: {error?.message}
                </SizableText>
            </View>
        );
    }

    return (
        <View flex={1} paddingTop='$space.5' paddingHorizontal='$space.4'>
            <XStack alignItems='center' justifyContent='space-between'>
                <IconBtn onPress={() => router.back()} icon='close-outline' />
                <H3 textAlign='center'>{workout.name}</H3>
                <IconBtn
                    onPress={onDeletePress}
                    icon='trash-outline'
                    backgroundColor={theme.red6.val}
                    iconColor={theme.red10.val}
                    isLoading={isDeleting}
                />
            </XStack>
            <TimeAndDateInfo createdAt={workout.workoutDate} duration={workout.duration} />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={workout.exercises}
                renderItem={({ item }) => <Exercise exercise={item} />}
                ListFooterComponent={() => <View height='$space.5' />}
            />
        </View>
    );
}
