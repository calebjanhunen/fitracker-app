import React from 'react';
import { FlatList } from 'react-native';

import { Button, PageView, Spacer, Text } from '../../../components';
import { type Workout } from '../../../interfaces/Workout';
import WorkoutHistoryCard from '../components/WorkoutHistoryCard';

export default function WorkoutTrackerMainScreen(): React.ReactElement {
    return (
        <PageView>
            <Text variant='headline'>WORKOUT HISTORY</Text>
            <Spacer size='xs' />
            <FlatList
                style={{ flex: 1 }}
                data={mockWorkoutData}
                renderItem={({ item }) => <WorkoutHistoryCard workout={item} />}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <Spacer size='xl' />}
            />
            <Spacer size='xxs' />
            <Button backgroundColor='primary' textColor='white' onClick={() => {}}>
                Start Workout
            </Button>
            <Spacer size='xxs' />
        </PageView>
    );
}

const mockWorkoutData: Workout[] = [
    {
        name: 'Push1',
        dateCreated: 'Wednesday July 5th, 2023',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Cable Lateral Raise',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrushers (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
];
