import React from 'react';

import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { H3, useTheme, View, XStack } from 'tamagui';

import { FlatList } from 'react-native-gesture-handler';
import { IErrorResponse } from 'src/api/client';
import { WorkoutResponseDto } from 'src/api/generated';
import { useDeleteWorkout } from 'src/api/hooks';
import { IconBtn } from 'src/components/common/icon-btn';
import Exercise from 'src/components/profile/workout-details/Exercise';
import TimeAndDateInfo from 'src/components/profile/workout-details/TimeAndDateInfo';

export default function WorkoutDetailsModal() {
    const { workout } = useLocalSearchParams<{ workout: string }>();
    const decodedWorkout: WorkoutResponseDto = JSON.parse(decodeURIComponent(workout));
    const { deleteWorkout, isDeleting } = useDeleteWorkout(() => {}, onDeleteError);
    const theme = useTheme();

    function onDeletePress() {
        Alert.alert(
            `Are you sure you want to delete ${decodedWorkout.name}?`,
            'This will remove the xp gained from completing the workout.',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => deleteWorkout(decodedWorkout.id),
                    style: 'destructive',
                },
            ]
        );
    }
    function onDeleteError(error: IErrorResponse) {
        Alert.alert('Could not delete workout', error.message);
    }

    return (
        <View flex={1} paddingTop='$space.5' paddingHorizontal='$space.4'>
            <XStack alignItems='center' justifyContent='space-between'>
                <IconBtn onPress={() => router.back()} icon='close-outline' />
                <H3 textAlign='center'>{decodedWorkout.name}</H3>
                <IconBtn
                    onPress={onDeletePress}
                    icon='trash-outline'
                    backgroundColor={theme.red6.val}
                    iconColor={theme.red10.val}
                    isLoading={isDeleting}
                />
            </XStack>
            <TimeAndDateInfo
                createdAt={decodedWorkout.createdAt}
                duration={decodedWorkout.duration}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={decodedWorkout.exercises}
                renderItem={({ item }) => <Exercise exercise={item} />}
                ListFooterComponent={() => <View height='$space.5' />}
            />
        </View>
    );
}
