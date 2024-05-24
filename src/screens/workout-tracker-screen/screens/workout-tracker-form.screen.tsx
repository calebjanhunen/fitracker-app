import React from 'react';

import { Button, Input, List } from '@ui-kitten/components';

import { View } from 'react-native';
import { PageView, Spacer } from 'src/components';
import Exercise from '../components/workout-tracker-form/exercise';

export default function WorkoutTrackerFormScreen(): React.ReactElement {
    const renderExercise = (): React.ReactElement => <Exercise />;

    return (
        <PageView>
            <Input placeholder='Enter Workout Name' />
            <Spacer size='spacing-8' />
            <View>
                <List data={[0, 0]} renderItem={renderExercise} />
            </View>
            <Spacer size='spacing-8' />
            <Button size='small'>Add Exercise</Button>
        </PageView>
    );
}
