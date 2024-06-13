/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import React, { useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, View } from 'react-native';
import { Spacer } from 'src/components';
import { useLogin } from 'src/hooks/api/auth/useLogin';

export default function LoginScreen(): React.ReactElement {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login, isLoading, errorMsg } = useLogin();

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
            <Layout style={loginStyles.layout}>
                <Spacer size='spacing-8' />
                <Spacer size='spacing-8' />
                <Spacer size='spacing-8' />
                <Spacer size='spacing-8' />
                <Spacer size='spacing-8' />
                <Spacer size='spacing-8' />
                <Spacer size='spacing-8' />
                <Text category='h1' status='primary'>
                    Fitracker
                </Text>
                <Spacer size='spacing-8' />
                <View style={loginStyles.loginForm}>
                    <Input placeholder='Username' onChangeText={setUsername} />
                    <Input
                        placeholder='Password'
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <Button onPress={() => login({ username, password })}>
                        {isLoading ? <ActivityIndicator /> : 'Login'}
                    </Button>
                    {errorMsg && (
                        <Text category='p2' status='danger'>
                            {errorMsg}
                        </Text>
                    )}
                </View>
            </Layout>
        </TouchableWithoutFeedback>
    );
}

const loginStyles = StyleSheet.create({
    layout: {
        flex: 1,
        alignItems: 'center',
    },
    loginForm: {
        gap: 16,
        flex: 1,
        alignItems: 'center',
    },
});
