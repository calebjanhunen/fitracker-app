import React, { useContext, useEffect, useState, type Dispatch } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, PageView, Spacer, Text } from '../../../../components';
import { useAuth } from '../../../../hooks/useAuth';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { AuthContext } from '../../../../services/context/AuthContext';
import { SignupBody, WorkoutDayOrTimeBtn } from '../components';
import { SignupDataContext } from '../signup-context/SignupDataContext';
import { SignupActionTypes, type ActionProps } from '../signup-context/SignupDataReducer';

type Props = StackScreenProps<RootStackParamList, 'WorkoutTimes'>;

function updateSignupContext(
    selectedTimeIds: number[],
    dispatchSignupData: Dispatch<ActionProps>
): void {
    dispatchSignupData({
        type: SignupActionTypes.ADD_WORKOUT_TIMES,
        payload: selectedTimeIds,
    });
}

export default function WorkoutTimes({ navigation }: Props): React.ReactElement {
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const { isLoading } = useContext(AuthContext);
    const { signup } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [selectedTimeIds, setSelectedTimeIds] = useState<number[]>(signupData.workoutTimes || []);
    const isBtnDisabled = selectedTimeIds.length === 0 || Boolean(!signupData.workoutTimes);

    async function signupUser(): Promise<void> {
        setErrorMessage('');
        try {
            await signup(signupData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updateSignupContext(selectedTimeIds, dispatchSignupData);
    }, [selectedTimeIds]);

    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Workout Times
            </Text>
            <SignupBody>
                <FlatList
                    data={workoutTimes}
                    renderItem={({ item }) => (
                        <WorkoutDayOrTimeBtn
                            id={item.id}
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
                disabled={isBtnDisabled}
                onPress={() => {
                    updateSignupContext(selectedTimeIds, dispatchSignupData);
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
    { id: 1, text: 'Morning', subText: '6AM-12PM' },
    { id: 2, text: 'Afternoon', subText: '12PM-6PM' },
    { id: 3, text: 'Evening', subText: '6PM-12AM' },
    { id: 4, text: 'Night', subText: '12AM-6AM' },
];
