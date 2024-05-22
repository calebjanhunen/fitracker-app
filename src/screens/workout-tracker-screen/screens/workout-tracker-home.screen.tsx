import React from 'react';

import { Button, Layout, List, Text } from '@ui-kitten/components';

import { Spacer } from 'src/components';
import WorkoutHistoryCard from 'src/screens/workout-tracker-screen/components/workout-history-card';

export default function WorkoutTrackerHomeScreen(): React.ReactElement {
    const renderWorkoutHistoryCard = ({ item }): React.ReactElement => <WorkoutHistoryCard />;

    return (
        <Layout>
            <Spacer size='spacing-4' />
            <Button>Start Empty Workout</Button>
            <Spacer size='spacing-5' />
            <Text category='h4'>Workout History:</Text>
            <List
                data={[1, 1, 2, 5, 6]}
                renderItem={renderWorkoutHistoryCard}
                ItemSeparatorComponent={() => <Spacer size='spacing-4' />}
                style={{ backgroundColor: 'transparent' }}
            />
        </Layout>
    );
}
