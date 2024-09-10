import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from 'src/context/auth-context/AuthContext';
import { Button } from 'tamagui';

export default function Profile() {
    const { logout } = useAuth();

    return (
        <View>
            <Text>Profile</Text>
            <Button onPress={async () => await logout()}>Logout</Button>
        </View>
    );
}
