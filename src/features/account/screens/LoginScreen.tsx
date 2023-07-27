import React, { useState, type Dispatch, type SetStateAction } from 'react';

import { styled } from 'styled-components';

import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, PageView, Spacer, Text, TextInput } from '../../../components';

const LoginForm = styled(View)<{ top: number }>`
    flex: 1;
    padding-top: ${(props) => props.theme.spacing.xxxxl};
`;

const LoginFooter = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${(props) => props.theme.spacing.xxxs};
`;

function login(
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>
): void {
    // TODO: log user in and navigate to home page
    console.log(username, password);
    setUsername('');
    setPassword('');
}

export default function LoginScreen(): React.ReactElement {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
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
                <Spacer size='lg' />
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    onPress={() => {
                        login(username, setUsername, password, setPassword);
                    }}
                >
                    Login
                </Button>
            </LoginForm>

            <LoginFooter>
                <Text variant='body' textAlign='center'>
                    Don&apos;t have an account?
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        // TODO: navigate to signup page
                    }}
                >
                    <Text variant='body' color='onWhite'>
                        Sign up
                    </Text>
                </TouchableOpacity>
            </LoginFooter>
        </PageView>
    );
}
