/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React from 'react';

import { Card, List, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import { MoreOptionsMenu, type MoreOptionsMenuItem } from 'src/components';
import Spacer from 'src/components/spacer/spacer';
import { type ExerciseInWorkout, type Workout } from 'src/interfaces/workout';
import { formatDate } from 'src/utils/format-date';
import { useDeleteWorkout } from 'src/hooks/api/workouts/useDeleteWorkout';

interface Props {
    workout: Workout;
}

export default function WorkoutHistoryCard({ workout }: Props): React.ReactElement {
    const { deleteWorkout } = useDeleteWorkout();
    const menuItems: MoreOptionsMenuItem[] = [
        {
            onSelect: () => {},
            text: 'Edit Workout',
            icon: 'create-outline',
            iconColor: 'color-primary-500',
        },
        {
            onSelect: () => deleteWorkout(workout.id),
            text: 'Delete',
            icon: 'trash',
            iconColor: 'color-danger-500',
        },
    ];

    const renderExercises = ({ item }: { item: ExerciseInWorkout }): React.ReactElement => (
        <View style={cardStyles.exercise}>
            <Text style={cardStyles.exerciseName} numberOfLines={1}>
                {item.name}
            </Text>
            <Text style={cardStyles.numSets}>{item.sets.length} sets</Text>
        </View>
    );

    return (
        <Card>
            <View style={cardStyles.workoutHeader}>
                <Text category='h5' numberOfLines={1} style={{ flex: 1 }}>
                    {workout.name}
                </Text>
                <MoreOptionsMenu menuItems={menuItems} />
            </View>
            <Spacer size='spacing-1' />
            <Text category='s1' appearance='hint'>
                {formatDate(workout.createdAt)}
            </Text>
            <Spacer size='spacing-2' />
            <Text category='h6'>Exercises</Text>
            <Spacer size='spacing-1' />
            <List
                data={workout.exercises}
                renderItem={renderExercises}
                style={{ backgroundColor: 'transparent' }}
            />
        </Card>
    );
}

const cardStyles = StyleSheet.create({
    workoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
    },
    exercise: {
        flexDirection: 'row',
    },
    exerciseName: { flex: 4 },
    numSets: { flex: 1, textAlign: 'right' },
});
