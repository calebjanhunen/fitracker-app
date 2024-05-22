import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Spacer } from 'src/components';

export default function LoginScreen(): React.ReactElement {
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
                    <Input placeholder='Username' />
                    <Input placeholder='Password' />
                    <Button>Login</Button>
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
