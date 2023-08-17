import React, { useContext, useState, type Dispatch } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, PageView, Spacer, Text } from '../../../../components';
import { useAuth } from '../../../../hooks/useAuth';
import { type SignupData } from '../../../../interfaces/User';
import { SignupDataMock } from '../../../../mock-data/SignupDataMock';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { AuthContext } from '../../../../services/context/AuthContext';
import { SignupBody, WorkoutDayOrTimeBtn } from '../components';
import { SignupDataContext } from '../signup-context/SignupDataContext';
import { SignupActionTypes, type ActionProps } from '../signup-context/SignupDataReducer';

type Props = StackScreenProps<RootStackParamList, 'WorkoutTimes'>;

function updateSignupContext(
    selectedTimeIds: number[],
    signupData: SignupData,
    dispatchSignupData: Dispatch<ActionProps>
): void {
    const selectedTimes = selectedTimeIds.map((id) => workoutTimes[id].text);
    dispatchSignupData({
        type: SignupActionTypes.ADD_WORKOUT_TIMES,
        payload: selectedTimes,
    });
}

export default function WorkoutTimes({ navigation }: Props): React.ReactElement {
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const { isLoading } = useContext(AuthContext);
    const { signup } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedTimeIds, setSelectedTimeIds] = useState<number[]>(
        signupData.workoutTimes
            ? signupData.workoutTimes.map((time: string) =>
                  workoutTimes.findIndex((workoutTime) => workoutTime.text === time)
              )
            : []
    );

    async function signupUser(): Promise<void> {
        setErrorMessage('');
        try {
            await signup(signupData);
        } catch (error) {
            console.log(error);
        }
    }

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
                            selectedIds={selectedTimeIds}
                            setSelectedIds={setSelectedTimeIds}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer size='md' />}
                />
            </SignupBody>
            <Text variant='body' color='error' textAlign='center'>
                {errorMessage}
            </Text>
            <Spacer size='md' />
            <Button
                variant='full'
                backgroundColor='primary'
                textColor='white'
                loading={isLoading}
                onPress={() => {
                    updateSignupContext(selectedTimeIds, signupData, dispatchSignupData);
                    void signupUser();
                }}
            >
                {isLoading ? <ActivityIndicator color='white' /> : 'Finish'}
            </Button>
            <Spacer size='xl' />
        </PageView>
    );
}

const workoutTimes = [
    { text: 'Morning', subText: '6AM-12PM' },
    { text: 'Afternoon', subText: '12PM-6PM' },
    { text: 'Evening', subText: '6PM-12AM' },
    { text: 'Night', subText: '12AM-6AM' },
];
