import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';

import { Button, PageView, Spacer, Text } from '../../../../components';
import useApi from '../../../../hooks/useApi';
import { type RootStackParamList } from '../../../../navigation/WorkoutTrackerNavigation';
import { getWorkouts } from '../../../../services/api/WorkoutsAPI';
import WorkoutHistoryCard from '../../components/WorkoutHistoryCard';
import { PreviousWorkoutContainer } from './Styles';

type StackNavigationType = StackNavigationProp<RootStackParamList>;

export default function WorkoutTrackerMainScreen(): React.ReactElement {
    const navigation = useNavigation<StackNavigationType>();
    const { execute: initGetWorkouts, data: workouts, isLoading } = useApi(getWorkouts);

    useEffect(() => {
        void initGetWorkouts();
    }, []);

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

// const mockWorkoutData: Workout[] = [
//     {
//         name: 'Push 1',
//         dateCreated: 'Wednesday July 5th, 2023',
//         exercises: [
//             {
//                 name: 'Barbell Bench Press',
//                 sets: 3,
//                 reps: 12,
//                 rpe: 10,
//             },
//             {
//                 name: 'Incline Bench Press',
//                 sets: 3,
//                 reps: 12,
//                 rpe: 10,
//             },
//             {
//                 name: 'Chest Fly',
//                 sets: 3,
//                 reps: 12,
//                 rpe: 10,
//             },
//             {
//                 name: 'Cable Lateral Raise',
//                 sets: 3,
//                 reps: 12,
//                 rpe: 10,
//             },
//             {
//                 name: 'Skullcrushers (Dumbbell)',
//                 sets: 3,
//                 reps: 12,
//                 rpe: 10,
//             },
//             {
//                 name: 'Triceps Extension (Cable)',
//                 sets: 3,
//                 reps: 12,
//                 rpe: 10,
//             },
//         ],
//     },
// ];
