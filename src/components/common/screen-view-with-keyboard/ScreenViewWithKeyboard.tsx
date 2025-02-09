import React, { ComponentProps } from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { useTheme, View } from 'tamagui';

interface Props extends ComponentProps<typeof View> {
    children: React.ReactNode;
    padding?: boolean;
}

export default function ScreenViewWithKeyboard({ children, padding, ...viewProps }: Props) {
    const theme = useTheme();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: theme.background.val, borderRadius: 10 }}
            >
                <View
                    {...viewProps}
                    paddingHorizontal={padding !== false ? '$space.5' : 0}
                    flex={1}
                >
                    {children}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
