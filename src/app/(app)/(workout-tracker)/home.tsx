import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

export default function Home() {
    const theme = useTheme();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.get() }}>
            <Text>Hello</Text>
        </SafeAreaView>
    );
}
