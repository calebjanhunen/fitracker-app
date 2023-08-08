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
import { useAuth } from '../../../../hooks/useAuth';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { AuthContext } from '../../../../services/auth/authContext';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'Signup1'>;

export default function Signup1({ navigation }: Props): React.ReactElement {
    const [email, setEmail] = useState<string>('calebjanhunen@gmail.com');
    const [username, setUsername] = useState<string>('caleb');
    const [password, setPassword] = useState<string>('123');
    const [confirmPassword, setConfirmPassword] = useState<string>('123');
    const { signup } = useAuth();
    const { isLoading } = useContext(AuthContext);

    const isBtnDisabled =
        email.length === 0 ||
        username.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0;

    async function onSignupBtnPress(): Promise<void> {
        try {
            // await signup(username, password, email);
            navigation.push('FitnessGoals');
        } catch (error) {
            console.log(error);
        }
    }

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
                </SignupBody>
                <Spacer size='xl' />
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    disabled={isBtnDisabled}
                    onPress={() => {
                        void onSignupBtnPress();
                    }}
                >
                    Sign up
                </Button>
                <Spacer size='xl' />
                <SignupFooter navigation={navigation} />
            </PageView>
        </DismissKeyboardContainer>
    );
}
