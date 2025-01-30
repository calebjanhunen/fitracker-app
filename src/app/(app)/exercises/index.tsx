import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetAllExercises } from 'src/api/hooks';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import { ExerciseList } from 'src/components/exercises';
import { useFilteredData } from 'src/hooks/common/useFilteredData';
import { H3, Input, useTheme, YStack } from 'tamagui';

export default function ExercisesHome() {
    const theme = useTheme();
    const { data: exercises, isLoading, error } = useGetAllExercises();
    const {
        searchQuery,
        setSearchQuery,
        filteredData: filteredExercises,
    } = useFilteredData(exercises, 'name');

    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.background.val }}
            edges={['top']}
        >
            <KeyboardAvoidingView>
                <H3 paddingBottom='$space.3'>Exercises</H3>
                <YStack paddingBottom='$space.5'>
                    <Input
                        placeholder='Search for exercise'
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCorrect={false}
                    />
                </YStack>
                <ExerciseList exercises={filteredExercises} isLoading={isLoading} error={error} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
