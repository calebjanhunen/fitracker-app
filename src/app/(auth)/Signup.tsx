import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'src/context/auth-context/AuthContext';
import {
    Button,
    H1,
    H2,
    Input,
    ScrollView,
    Spinner,
    Text,
    useTheme,
    XStack,
    YStack,
} from 'tamagui';

export default function Signup() {
    const theme = useTheme();
    const { signup, loading, errorMsg } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        setButtonDisabled(
            !username ||
                !password ||
                !confirmPassword ||
                !email ||
                !firstName ||
                !lastname ||
                loading
        );
    }, [username, password, confirmPassword, email, firstName, lastname, loading]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView flex={1} paddingHorizontal='$5'>
                        <H1 size='$10' color='$color' textAlign='center' paddingTop='$10'>
                            Fitracker
                        </H1>
                        <YStack flex={1} justifyContent='center' gap='$5'>
                            <H2>Signup</H2>
                            <Input
                                placeholder='Username'
                                onChangeText={setUsername}
                                size='$5'
                                autoCapitalize='none'
                            />
                            <Input
                                placeholder='Password'
                                onChangeText={setPassword}
                                size='$5'
                                secureTextEntry={true}
                            />
                            <Input
                                placeholder='Confirm Password'
                                onChangeText={setConfirmPassword}
                                size='$5'
                                secureTextEntry={true}
                            />
                            <Input
                                placeholder='Email'
                                onChangeText={setEmail}
                                size='$5'
                                inputMode='email'
                                autoCapitalize='none'
                            />
                            <Input placeholder='First Name' onChangeText={setFirstName} size='$5' />
                            <Input placeholder='Last Name' onChangeText={setLastName} size='$5' />
                            <Button
                                marginTop='$5'
                                onPress={async () =>
                                    await signup(
                                        username,
                                        password,
                                        confirmPassword,
                                        email,
                                        firstName,
                                        lastname
                                    )
                                }
                                disabled={!username || !password}
                                opacity={buttonDisabled ? 0.5 : 1}
                            >
                                {loading ? <Spinner /> : 'Signup'}
                            </Button>
                            {errorMsg && (
                                <Text color='$red11Light' textAlign='center'>
                                    {errorMsg}
                                </Text>
                            )}
                        </YStack>
                        <XStack
                            alignItems='center'
                            justifyContent='center'
                            paddingTop='$2'
                            gap='$2'
                        >
                            <Text>Already have an account?</Text>
                            <Link
                                href='/(auth)/Login'
                                style={{
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Login
                            </Link>
                        </XStack>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
