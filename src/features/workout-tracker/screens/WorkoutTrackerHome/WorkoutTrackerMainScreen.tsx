import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';

import { Button, PageView, Spacer, Text } from '../../../../components';
import useGetWorkouts from '../../../../hooks/workouts/useGetWorkouts';
import { type RootStackParamList } from '../../../../navigation/WorkoutTrackerNavigation';
import WorkoutHistoryCard from '../../components/WorkoutHistoryCard/WorkoutHistoryCard';
import { PreviousWorkoutContainer } from './Styles';

type StackNavigationType = StackNavigationProp<RootStackParamList>;

export default function WorkoutTrackerMainScreen(): React.ReactElement {
    const navigation = useNavigation<StackNavigationType>();
    const { workouts, isLoading } = useGetWorkouts();

    return (
        <PageView>
            <Text variant='headline'>WORKOUT HISTORY</Text>
            <Spacer size='xs' />
            <PreviousWorkoutContainer>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        style={{ flex: 1 }}
                        data={workouts}
                        renderItem={({ item }) => <WorkoutHistoryCard workout={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => <Spacer size='xl' />}
                    />
                )}
            </PreviousWorkoutContainer>
            <Spacer size='xxs' />
            <Button
                variant='full'
                backgroundColor='primary'
                textColor='white'
                onPress={() => {
                    navigation.navigate('StartWorkout');
                }}
            >
                Start Workout
            </Button>
            <Spacer size='xxs' />
        </PageView>
    );
}
