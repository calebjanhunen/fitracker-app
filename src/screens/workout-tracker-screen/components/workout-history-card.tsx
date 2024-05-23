import React from 'react';

import { Card, List, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import Spacer from 'src/components/spacer/spacer';
import { type ExerciseInWorkout, type Workout } from 'src/interfaces/workout';
import { formatDate } from 'src/utils/format-date';

interface Props {
    workout: Workout;
}

export default function WorkoutHistoryCard({ workout }: Props): React.ReactElement {
    const renderExercises = ({ item }: { item: ExerciseInWorkout }): React.ReactElement => (
        <View style={cardStyles.exercise}>
            <Text>{item.name}</Text>
            <Text>{item.sets.length} sets</Text>
        </View>
    );

    return (
        <Card>
            <Text category='h5'>{workout.name}</Text>
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
    exercise: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
