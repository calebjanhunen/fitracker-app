import React from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import {
    Button,
    DismissKeyboardContainer,
    PageView,
    Spacer,
    Text,
    TextInput,
} from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'Signup1'>;

export default function Signup1({ navigation }: Props): React.ReactElement {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return (
        <DismissKeyboardContainer>
            <PageView>
                <Text variant='title' textAlign='center'>
                    Enter Account Info
                </Text>
                <SignupBody>
                    <TextInput
                        variant='smallTitle'
                        placeholder='Email'
                        autoComplete='email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                    <Spacer size='xl' />
                    <TextInput
                        autoCapitalize='none'
                        variant='smallTitle'
                        placeholder='Username'
                        onChangeText={(text) => {}}
                    />
                    <Spacer size='xl' />
                    <TextInput variant='smallTitle' placeholder='Password' secureTextEntry />
                    <Spacer size='xl' />
                    <TextInput
                        variant='smallTitle'
                        placeholder='Confirm Password'
                        secureTextEntry
                    />
                    <Spacer size='xl' />
                    <Button
                        variant='full'
                        backgroundColor='primary'
                        textColor='white'
                        onPress={() => {}}
                    >
                        Next
                    </Button>
                </SignupBody>
                <SignupFooter navigation={navigation} />
            </PageView>
        </DismissKeyboardContainer>
    );
}
