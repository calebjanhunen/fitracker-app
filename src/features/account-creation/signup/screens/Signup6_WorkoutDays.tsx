import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, WorkoutDayOrTimeBtn } from '../components';
import { SignupDataContext } from '../signup-context/SignupDataContext';
import { SignupActionTypes } from '../signup-context/SignupDataReducer';

type Props = StackScreenProps<RootStackParamList, 'WorkoutDays'>;

export default function WorkoutDays({ navigation }: Props): React.ReactElement {
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const [selectedDayIds, setSelectedDayIds] = useState<number[]>(signupData.workoutDays || []);
    const isNextBtnDisabled = selectedDayIds.length === 0;

    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Workout Days
            </Text>
            <SignupBody>
                <FlatList
                    data={workoutDays}
                    renderItem={({ item }) => (
                        <WorkoutDayOrTimeBtn
                            id={item.id}
                            text={item.day}
                            selectedIds={selectedDayIds}
                            setSelectedIds={setSelectedDayIds}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer size='md' />}
                />
            </SignupBody>
            <Button
                variant='full'
                backgroundColor='primary'
                textColor='white'
                disabled={isNextBtnDisabled}
                onPress={() => {
                    dispatchSignupData({
                        type: SignupActionTypes.ADD_WORKOUT_DAYS,
                        payload: selectedDayIds,
                    });
                    navigation.push('WorkoutTimes');
                }}
            >
                Next
            </Button>
            <Spacer size='xl' />
        </PageView>
    );
}

const workoutDays = [
    { id: 1, day: 'Sunday' },
    { id: 2, day: 'Monday' },
    { id: 3, day: 'Tuesday' },
    { id: 4, day: 'Wednesday' },
    { id: 5, day: 'Thursday' },
    { id: 6, day: 'Friday' },
    { id: 7, day: 'Saturday' },
];
