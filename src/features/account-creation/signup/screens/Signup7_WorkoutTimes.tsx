import React, { useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter, WorkoutDayOrTimeBtn } from '../components';

type Props = StackScreenProps<RootStackParamList, 'WorkoutTimes'>;

export default function WorkoutTimes({ navigation }: Props): React.ReactElement {
    const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Workout Times
            </Text>
            <SignupBody>
                <FlatList
                    data={workoutTimes}
                    renderItem={({ item, index }) => (
                        <WorkoutDayOrTimeBtn
                            id={index}
                            text={item.text}
                            subText={item.subText}
                            selectedIds={selectedTimes}
                            setSelectedIds={setSelectedTimes}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer size='md' />}
                />
            </SignupBody>
            <Button
                variant='full'
                backgroundColor='primary'
                textColor='white'
                onPress={() => {
                    // TODO: send values to backend to create account
                }}
            >
                Sign up
            </Button>
            <Spacer size='xl' />
            <SignupFooter navigation={navigation} />
        </PageView>
    );
}

const workoutTimes = [
    { text: 'Morning', subText: '6AM-12PM' },
    { text: 'Afternoon', subText: '12PM-6PM' },
    { text: 'Evening', subText: '6PM-12AM' },
    { text: 'Night', subText: '12AM-6AM' },
];
