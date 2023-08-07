import React, { useContext, useState } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';
import { styled } from 'styled-components';

import { ActivityIndicator, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    Button,
    DismissKeyboardContainer,
    PageView,
    Spacer,
    Text,
    TextInput,
} from '../../../components';
import { useAuth } from '../../../hooks/useAuth';
import { type RootStackParamList } from '../../../navigation/AccountNavigation';
import { AuthContext } from '../../../services/auth/authContext';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginForm = styled(View)`
    flex: 1;
    padding-top: ${(props) => props.theme.spacing.xxxxl};
`;

const LoginFooter = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${(props) => props.theme.spacing.xxxs};
`;

export default function LoginScreen({ navigation }: Props): React.ReactElement {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login } = useAuth();
    const { isLoading } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState<string>('');

    async function onLoginPress(): Promise<void> {
        setErrorMessage('');
        try {
            await login(username, password);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }
    }

    return (
        <DismissKeyboardContainer>
            <PageView>
                <LoginForm>
                    <Text variant='appTitle' textAlign='center'>
                        FitFriends
                    </Text>
                    <Spacer size='md' />
                    <TextInput
                        autoCapitalize='none'
                        variant='smallTitle'
                        placeholder='Username'
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                        }}
                    />
                    <Spacer size='md' />
                    <TextInput
                        variant='smallTitle'
                        placeholder='Password'
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                    />
                    <Spacer size='xxs' />
                    <Text textAlign='center' variant='body' color='error'>
                        {errorMessage ?? ' '}
                    </Text>
                    <Spacer size='lg' />
                    <Button
                        variant='full'
                        backgroundColor='primary'
                        textColor='white'
                        disabled={isLoading}
                        onPress={() => {
                            void onLoginPress();
                        }}
                    >
                        {isLoading ? <ActivityIndicator color='blue' /> : 'Login'}
                    </Button>
                </LoginForm>

                <LoginFooter>
                    <Text variant='body' textAlign='center'>
                        Don&apos;t have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.push('Signup1');
                        }}
                    >
                        <Text variant='body' color='onWhite'>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </LoginFooter>
            </PageView>
        </DismissKeyboardContainer>
    );
}
