import React from 'react';
import { FlatList } from 'react-native';

import { PageView, Spacer, Text } from '../../../components';
import WorkoutHistoryCard from '../components/WorkoutHistoryCard';

export default function WorkoutTrackerMainScreen(): React.ReactElement {
    return (
        <PageView>
            <Text variant='headline'>WORKOUT HISTORY</Text>
            <Spacer size='xs' />
            <FlatList
                data={[0, 1, 2, 3, 4]}
                renderItem={({ item }) => <WorkoutHistoryCard />}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <Spacer size='xl' />}
                ListFooterComponent={() => <Spacer size='xxxl' />}
            />
        </PageView>
    );
}
