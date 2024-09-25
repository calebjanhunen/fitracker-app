import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { IErrorResponse } from 'src/api/client';
import { IDeleteWorkoutResponse } from 'src/api/workout-service/responses/IDeleteWorkoutResponse';
import { IWorkoutResponse } from 'src/api/workout-service/responses/IWorkoutResponse';
import PopoverMenu, { PopoverMenuOptions } from 'src/components/common/PopoverMenu';
import { useDeleteWorkout } from 'src/hooks/workout-tracker/useDeleteWorkout';
import { updateTotalXP } from 'src/redux/user/UserSlice';
import { formatDate } from 'src/utils/FormatDate';
import { formatWorkoutDuration } from 'src/utils/formatWorkoutDuration';
import { Card, H4, SizableText, Spinner, useTheme, XStack } from 'tamagui';

interface Props {
    workout: IWorkoutResponse;
}

export default function WorkoutHistoryCard({ workout }: Props) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { deleteWorkout, isDeleting } = useDeleteWorkout(onDeleteSuccess, onDeleteError);
    const menuOptions: PopoverMenuOptions[] = [
        {
            text: 'Edit',
            action: () => {},
            icon: 'create-outline',
            iconColor: theme.blue10.val,
        },
        {
            text: 'Delete',
            action: onDeletePress,
            icon: 'trash-outline',
            iconColor: theme.red10.val,
        },
    ];

    function onDeletePress() {
        Alert.alert(
            `Are you sure you want to delete ${workout.name}?`,
            'This will remove the xp gained from completing the workout.',
            [
                { text: 'Cancel', onPress: () => {}, style: 'cancel' },
                { text: 'Delete', onPress: () => deleteWorkout(workout.id), style: 'destructive' },
            ]
        );
    }

    function onDeleteSuccess(response: IDeleteWorkoutResponse) {
        dispatch(updateTotalXP(response.totalUserXp));
    }

    function onDeleteError(error: IErrorResponse) {
        Alert.alert('Could not delete workout', error.message);
    }

    if (isDeleting) {
        return <Spinner />;
    }

    return (
        <Card>
            <Card.Header elevate bordered borderRadius='$radius.5'>
                <XStack alignItems='center' justifyContent='space-between'>
                    <H4>{workout.name}</H4>
                    <PopoverMenu menuOptions={menuOptions} />
                </XStack>
                <XStack gap='$space.4'>
                    <XStack alignItems='center' gap='$space.2'>
                        <IonIcons name='calendar-outline' size={15} />
                        <SizableText color='$gray10'>{formatDate(workout.createdAt)}</SizableText>
                    </XStack>
                    <XStack alignItems='center' gap='$space.2'>
                        <IonIcons name='time-outline' size={15} />
                        <SizableText color='$gray10'>
                            {formatWorkoutDuration(workout.duration)}
                        </SizableText>
                    </XStack>
                </XStack>
                <FlatList
                    scrollEnabled={false}
                    ListHeaderComponent={() => (
                        <SizableText fontWeight='bold'>Exercises</SizableText>
                    )}
                    data={workout.exercises}
                    renderItem={({ item }) => (
                        <XStack gap='$space.3'>
                            <SizableText>
                                {item.name} - {item.sets.length}{' '}
                                {item.sets.length === 1 ? 'Set' : 'Sets'}
                            </SizableText>
                        </XStack>
                    )}
                />
            </Card.Header>
        </Card>
    );
}
