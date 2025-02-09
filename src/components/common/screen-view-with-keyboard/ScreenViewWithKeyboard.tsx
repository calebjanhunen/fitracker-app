import React, { ComponentProps } from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { useTheme, View } from 'tamagui';

interface Props extends ComponentProps<typeof View> {
    children: React.ReactNode;
    padding?: boolean;
    isFlex?: boolean;
}

export default function ScreenViewWithKeyboard({ children, padding, isFlex, ...viewProps }: Props) {
    const theme = useTheme();
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView
                style={{
                    flex: isFlex !== false ? 1 : 0,
                    backgroundColor: theme.background.val,
                    borderRadius: 10,
                }}
            >
                <View
                    paddingHorizontal={padding !== false ? '$space.5' : 0}
                    {...viewProps}
                    flex={isFlex !== false ? 1 : 0}
                >
                    {children}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
