import React from 'react';
import { Keyboard, Pressable } from 'react-native';

interface Props {
    children: React.ReactNode;
}

export default function DismissKeyboardContainer({ children }: Props): React.ReactElement {
    return (
        <Pressable
            style={{ flex: 1 }}
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            {children}
        </Pressable>
    );
}
