import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, useTheme } from 'tamagui';

export default function Home() {
    const theme = useTheme();
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.background.val, paddingHorizontal: 16 }}
        >
            <Button fontWeight='bold' backgroundColor='$color.green8Light' color='white'>
                Start Workout
            </Button>
        </SafeAreaView>
    );
}
