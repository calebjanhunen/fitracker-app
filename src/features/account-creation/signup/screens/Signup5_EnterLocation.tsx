import React from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import { PageView, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'SkillLevel'>;

export default function EnterLocation({ navigation }: Props): React.ReactElement {
    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Enter location
            </Text>
            <SignupBody></SignupBody>
            <SignupFooter navigation={navigation} />
        </PageView>
    );
}
