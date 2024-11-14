import React from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { useTheme, View } from 'tamagui';

export default function ScreenViewWithKeyboard({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
                <View paddingHorizontal='$space.5' flex={1}>
                    {children}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
