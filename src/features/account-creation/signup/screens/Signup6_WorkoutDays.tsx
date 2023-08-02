import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupDataContext } from '../../../../services/signup/SignupDataContext';
import { SignupActionTypes } from '../../../../services/signup/SignupDataReducer';
import { SignupBody, SignupFooter, WorkoutDayOrTimeBtn } from '../components';

type Props = StackScreenProps<RootStackParamList, 'WorkoutDays'>;

export default function WorkoutDays({ navigation }: Props): React.ReactElement {
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const [selectedDayIds, setSelectedDayIds] = useState<number[]>(
        signupData.workoutDays
            ? signupData.workoutDays.map((day) =>
                  workoutDays.findIndex((workoutDay) => workoutDay.day === day)
              )
            : []
    );
    const isNextBtnDisabled = selectedDayIds.length === 0;
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
                    const selectedDays = selectedDayIds.map((id) => workoutDays[id].day);
                    dispatchSignupData({
                        type: SignupActionTypes.ADD_WORKOUT_DAYS,
                        payload: selectedDays,
                    });
                    navigation.push('WorkoutTimes');
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
