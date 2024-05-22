import { Card, List, Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import Spacer from 'src/components/spacer/spacer';

export default function WorkoutHistoryCard(): React.ReactElement {
    const renderItem = ({ item }): React.ReactElement => (
        <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text>Exercise Name</Text>
            <Text>3 sets</Text>
        </View>
    );

    return (
        <Card>
            <Text category='h5'>Workout Name</Text>
            <Spacer size='spacing-1' />
            <Text category='s1' appearance='hint'>
                May 21, 2024
            </Text>
            <Spacer size='spacing-2' />
            <Text category='h6'>Exercises</Text>
            <Spacer size='spacing-1' />
            <List data={[0, 1, 2]} renderItem={renderItem} />
        </Card>
    );
}
