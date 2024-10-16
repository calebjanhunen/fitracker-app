import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { H3, SizableText, useTheme, View, XStack } from 'tamagui';

import { IErrorResponse } from 'src/api/client';
import { IDeleteWorkoutResponse } from 'src/api/workout-service/responses/IDeleteWorkoutResponse';
import { IWorkoutResponse } from 'src/api/workout-service/responses/IWorkoutResponse';
import { IconBtn } from 'src/components/common/icon-btn';
import { useDeleteWorkout } from 'src/hooks/workout-tracker/useDeleteWorkout';
import { updateTotalXP } from 'src/redux/user/UserSlice';
import { formatDate } from 'src/utils/FormatDate';
import { formatTime } from 'src/utils/FormatTime';

export default function WorkoutDetailsModal() {
    const { workout } = useLocalSearchParams<{ workout: string }>();
    const decodedWorkout: IWorkoutResponse = JSON.parse(decodeURIComponent(workout));
    const { deleteWorkout, isDeleting } = useDeleteWorkout(onDeleteSuccess, onDeleteError);
    const dispatch = useDispatch();
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

    function onDeleteSuccess(response: IDeleteWorkoutResponse) {
        dispatch(updateTotalXP(response.totalUserXp));
        router.back();
    }

    function onDeleteError(error: IErrorResponse) {
        Alert.alert('Could not delete workout', error.message);
    }

    return (
        <View paddingTop='$space.5' paddingHorizontal='$space.4'>
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
            <XStack gap='$space.5' paddingTop='$space.4'>
                <XStack alignItems='center' gap='$space.2'>
                    <IonIcons name='time-outline' size={18} />
                    <SizableText color='$gray10' size='$4'>
                        {formatTime(decodedWorkout.createdAt)}
                    </SizableText>
                </XStack>
                <XStack alignItems='center' gap='$space.2'>
                    <IonIcons name='calendar-outline' size={18} />
                    <SizableText color='$gray10' size='$4'>
                        {formatDate(decodedWorkout.createdAt)}
                    </SizableText>
                </XStack>
            </XStack>
        </View>
    );
}
