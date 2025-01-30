import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetAllExercises } from 'src/api/hooks';
import { ExerciseList, ExerciseListItem } from 'src/components/exercises';
import { H3, Input, SizableText, useTheme, View, XStack, YStack } from 'tamagui';

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
