import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter, WorkoutDayOrTimeBtn } from '../components';

type Props = StackScreenProps<RootStackParamList, 'EnterLocation'>;

export default function WorkoutDays({ navigation }: Props): React.ReactElement {
    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Workout Days
            </Text>
            <SignupBody>
                <FlatList
                    data={workoutDays}
                    renderItem={({ item, index }) => (
                        <WorkoutDayOrTimeBtn
                            id={index}
                            text={item.day}
                            selectedIds={selectedDays}
                            setSelectedIds={setSelectedDays}
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
                    // navigation.push('');
                }}
            >
                Next
            </Button>
            <Spacer size='xl' />
            <SignupFooter navigation={navigation} />
        </PageView>
    );
}

const workoutDays = [
    { day: 'Sunday' },
    { day: 'Monday' },
    { day: 'Tuesday' },
    { day: 'Wednesday' },
    { day: 'Thursday' },
    { day: 'Friday' },
    { day: 'Saturday' },
];
