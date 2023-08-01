import React from 'react';
import {} from 'react-native';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'EnterLocation'>;

export default function WorkoutDays({ navigation }: Props): React.ReactElement {
    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Workout Days
            </Text>
            <SignupBody></SignupBody>
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
