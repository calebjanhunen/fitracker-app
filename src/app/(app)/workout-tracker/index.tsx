import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Button, H4, useTheme, View, XStack } from 'tamagui';

import { IErrorResponse } from 'src/api/client';
import { IWorkoutTemplateResponse } from 'src/api/workout-template-service/responses/IWorkoutTemplateResponse';
import { GET_ALL_WORKOUT_TEMPLATES_QUERY_KEY } from 'src/api/workout-template-service/WorkoutTemplateApiConfig';
import { getAllWorkoutTemplates } from 'src/api/workout-template-service/WorkoutTemplateApiService';
import WorkoutTemplateCard from 'src/components/workout-tracker/home/WorkoutTemplateCard';
import WorkoutTemplatesContainer from 'src/components/workout-tracker/home/WorkoutTemplatesContainer';
import { useIsWorkoutInProgress } from 'src/context/workout-tracker/IsWorkoutInProgressContext';
import { updatedCreatedAt } from 'src/redux/workout-form/WorkoutFormSlice';

export default function Home() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { isWorkoutInProgress, setWorkoutInProgress } = useIsWorkoutInProgress();
    const {
        data: workoutTemplates,
        isLoading,
        error,
    } = useQuery<IWorkoutTemplateResponse[], IErrorResponse>({
        queryFn: getAllWorkoutTemplates,
        queryKey: [GET_ALL_WORKOUT_TEMPLATES_QUERY_KEY],
    });

    function onStartWorkoutPress() {
        if (!isWorkoutInProgress) {
            setWorkoutInProgress(true);
            dispatch(updatedCreatedAt());
        }
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.background.val, paddingHorizontal: 16 }}
        >
            <Link href='/workout-tracker/workout-form' asChild>
                <Button
                    fontWeight='bold'
                    backgroundColor='$color.green8Light'
                    color='white'
                    onPress={onStartWorkoutPress}
                    marginTop='$space.4'
                >
                    {isWorkoutInProgress ? 'Continue Workout' : 'Start Empty Workout'}
                </Button>
            </Link>
            <XStack
                alignItems='center'
                justifyContent='space-between'
                marginTop='$space.6'
                marginBottom='$space.3'
            >
                <H4>Workout Templates</H4>
                <Link href='/workout-tracker/workout-template-form' asChild>
                    <Button
                        height='0'
                        paddingHorizontal='$space.3'
                        paddingVertical='$space.1'
                        fontWeight='bold'
                        color='$green10'
                        backgroundColor='$green6'
                    >
                        Create Template
                    </Button>
                </Link>
            </XStack>
            <WorkoutTemplatesContainer
                isLoading={isLoading}
                error={error}
                numResults={workoutTemplates?.length ?? 0}
            >
                <FlatList
                    data={workoutTemplates}
                    numColumns={2}
                    renderItem={({ item }) => <WorkoutTemplateCard workoutTemplate={item} />}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    ItemSeparatorComponent={() => <View height='$1' />}
                />
            </WorkoutTemplatesContainer>
        </SafeAreaView>
    );
}
