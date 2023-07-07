import React from 'react';
import { FlatList } from 'react-native';

import { Button, PageView, Spacer, Text } from '../../../components';
import WorkoutHistoryCard from '../components/WorkoutHistoryCard';

export default function WorkoutTrackerMainScreen(): React.ReactElement {
    return (
        <PageView>
            <Text variant='headline'>WORKOUT HISTORY</Text>
            <Spacer size='xs' />
            <FlatList
                style={{ flex: 1 }}
                data={[0, 1, 2]}
                renderItem={({ item }) => <WorkoutHistoryCard />}
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
