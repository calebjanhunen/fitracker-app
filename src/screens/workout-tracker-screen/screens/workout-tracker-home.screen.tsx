import React from 'react';

import { Button, Layout, List, Text } from '@ui-kitten/components';

import { Spacer } from 'src/components';
import { useWorkouts } from 'src/hooks/useWorkouts';
import { type Workout } from 'src/interfaces/workout';
import WorkoutHistoryCard from 'src/screens/workout-tracker-screen/components/workout-history-card';

export default function WorkoutTrackerHomeScreen(): React.ReactElement {
    const { workouts } = useWorkouts();

    const renderWorkoutHistoryCard = ({ item }: { item: Workout }): React.ReactElement => (
        <WorkoutHistoryCard workout={item} />
    );

    return (
        <Layout>
            <Spacer size='spacing-4' />
            <Button>Start Empty Workout</Button>
            <Spacer size='spacing-5' />
            <Text category='h4'>Workout History:</Text>
            <List
                data={workouts}
                renderItem={renderWorkoutHistoryCard}
                ItemSeparatorComponent={() => <Spacer size='spacing-4' />}
                style={{ backgroundColor: 'transparent' }}
            />
        </Layout>
    );
}
