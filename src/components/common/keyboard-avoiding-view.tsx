import React from 'react';
import {
    KeyboardAvoidingView as KAV,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';

interface Props {
    children: React.ReactNode;
}
export default function KeyboardAvoidingView({ children }: Props) {
    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KAV style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {children}
        </KAV>
        // </TouchableWithoutFeedback>
    );
}
