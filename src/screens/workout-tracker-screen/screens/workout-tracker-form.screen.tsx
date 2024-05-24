import React from 'react';

import { Button, Input } from '@ui-kitten/components';

import { PageView, Spacer } from 'src/components';
import Exercise from '../components/workout-tracker-form/exercise';

export default function WorkoutTrackerFormScreen(): React.ReactElement {
    return (
        <PageView>
            <Input placeholder='Enter Workout Name' />
            <Spacer size='spacing-8' />
            <Exercise />
            <Spacer size='spacing-8' />
            <Button size='small'>Add Exercise</Button>
        </PageView>
    );
}
