import React, { useContext, useState } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import { ActivityIndicator } from 'react-native';
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
import { AuthContext } from '../../../../services/context/AuthContext';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'Signup1'>;

export default function Signup1({ navigation }: Props): React.ReactElement {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const { isLoading } = useContext(AuthContext);
    const { checkIfUserAlreadyExists } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const isBtnDisabled =
        email.length === 0 ||
        username.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0;

    async function onBtnPress(): Promise<void> {
        setErrorMessage('');
        try {
            await checkIfUserAlreadyExists(username, email);
            navigation.push('FitnessGoals');
        } catch (error) {
            setErrorMessage(error.message);
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
                        // secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                    />
                    <Spacer size='xl' />
                    <TextInput
                        variant='smallTitle'
                        placeholder='Confirm Password'
                        // secureTextEntry
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                        }}
                    />
                </SignupBody>
                <Spacer size='xl' />
                <Text variant='body' color='error' textAlign='center'>
                    {errorMessage}
                </Text>
                <Spacer size='md' />
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    disabled={isBtnDisabled}
                    loading={isLoading}
                    onPress={() => {
                        void onBtnPress();
                    }}
                >
                    {isLoading ? <ActivityIndicator /> : 'Next'}
                </Button>
                <Spacer size='xl' />
                <SignupFooter navigation={navigation} />
            </PageView>
        </DismissKeyboardContainer>
    );
}
