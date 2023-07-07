import React from 'react';

import { View } from 'react-native';
import { PageView, Spacer, Text } from '../../../components';

export default function WorkoutTrackerMainScreen(): React.ReactElement {
    return (
        <PageView>
            <Text variant='headline'>WORKOUT HISTORY</Text>
            <Spacer size='xs' />
            <View style={{ padding: 16, borderWidth: 1, borderStyle: 'solid', borderRadius: 16 }}>
                <Text variant='headline'>Push</Text>
                <Text variant='subhead' color='light'>
                    Wednesday July 5th, 2023
                </Text>
                <Spacer size='xxs' />
                <Text variant='headline'>Exercises</Text>
                <Text variant='body'>Barbell Bench Press: 3 sets</Text>
                <Text variant='body'>Incline Bench Press: 3 sets</Text>
                <Text variant='body'>Chest Fly: 3 sets</Text>
                <Text variant='body'>Cable Lateral Raise: 3 sets</Text>
                <Text variant='body'>Skullcrushers: 3 sets</Text>
                <Text variant='body'>Triceps Extension (Cable): 3 sets</Text>
            </View>
        </PageView>
    );
}
