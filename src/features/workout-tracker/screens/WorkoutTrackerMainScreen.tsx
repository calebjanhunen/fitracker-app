import React from 'react';

import { PageView, Spacer, Text } from '../../../components';
import WorkoutHistoryCard from '../components/WorkoutHistoryCard';

export default function WorkoutTrackerMainScreen(): React.ReactElement {
    return (
        <PageView>
            <Text variant='headline'>WORKOUT HISTORY</Text>
            <Spacer size='xs' />
            <WorkoutHistoryCard />
        </PageView>
    );
}
