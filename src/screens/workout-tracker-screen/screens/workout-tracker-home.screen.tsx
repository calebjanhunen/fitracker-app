import React from 'react';

import { Button, Text } from '@ui-kitten/components';

import { SafeAreaLayout, Spacer } from 'src/components';
import WorkoutHistoryCard from 'src/screens/workout-tracker-screen/components/workout-history-card';

export default function WorkoutTrackerHomeScreen(): React.ReactElement {
    return (
        <SafeAreaLayout>
            <Spacer size='spacing-4' />
            <Button>Start Empty Workout</Button>
            <Spacer size='spacing-5' />
            <Text category='h4'>Workout History:</Text>
            <WorkoutHistoryCard />
        </SafeAreaLayout>
    );
}
