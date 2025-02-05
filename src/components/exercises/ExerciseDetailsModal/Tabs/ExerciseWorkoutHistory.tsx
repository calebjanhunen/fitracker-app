import React from 'react';
import { Text, View } from 'react-native';
import { ExerciseWorkoutHistoryDto } from 'src/api/generated';

interface Props {
    workoutHistory: ExerciseWorkoutHistoryDto[];
}

export default function ExerciseWorkoutHistory({ workoutHistory }: Props) {
    return (
        <View>
            <Text>ExerciseWorkoutHistory</Text>
        </View>
    );
}
