import React, { useContext, useState } from 'react';

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
import { SignupDataContext } from '../signup-context/SignupDataContext';
import { SignupActionTypes } from '../signup-context/SignupDataReducer';

type Props = StackScreenProps<RootStackParamList, 'Signup1'>;

export default function Signup1({ navigation }: Props): React.ReactElement {
    const { dispatchSignupData } = useContext(SignupDataContext);
    const [email, setEmail] = useState<string>('calebjanhunen@gmail.com');
    const [username, setUsername] = useState<string>('calebjanhunen');
    const [password, setPassword] = useState<string>('123');
    const [confirmPassword, setConfirmPassword] = useState<string>('123');

    const isBtnDisabled =
        email.length === 0 ||
        username.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0;

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
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                        }}
                    />
                    <Spacer size='xl' />
                    <TextInput
                        autoCapitalize='none'
                        variant='smallTitle'
                        placeholder='Username'
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                        }}
                    />
                    <Spacer size='xl' />
                    <TextInput
                        variant='smallTitle'
                        placeholder='Password'
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                    />
                    <Spacer size='xl' />
                    <TextInput
                        variant='smallTitle'
                        placeholder='Confirm Password'
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                        }}
                    />
                    <Spacer size='xl' />
                    <Button
                        variant='full'
                        backgroundColor='primary'
                        textColor='white'
                        disabled={isBtnDisabled}
                        onPress={() => {
                            dispatchSignupData({
                                type: SignupActionTypes.UPDATE_ACCOUNT_INFO,
                                payload: { email, username, password },
                            });
                            navigation.push('FitnessGoals');
                        }}
                    >
                        Next
                    </Button>
                </SignupBody>
                <SignupFooter navigation={navigation} />
            </PageView>
        </DismissKeyboardContainer>
    );
}
