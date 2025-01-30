import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetAllExercises } from 'src/api/hooks';
import { ExerciseList } from 'src/components/exercises';
import { H3, Input, useTheme, YStack } from 'tamagui';

export default function ExercisesHome() {
    const theme = useTheme();
    const { data: exercises, isLoading, error } = useGetAllExercises();

    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.background.val }}
            edges={['top']}
        >
            <H3 paddingBottom='$space.3'>Exercises</H3>
            <YStack paddingBottom='$space.5'>
                <Input placeholder='Search for exercise' />
            </YStack>
            <ExerciseList exercises={exercises} isLoading={isLoading} error={error} />
        </SafeAreaView>
    );
}
