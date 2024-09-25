import React from 'react';
import { KeyboardAvoidingView as KAV, Platform } from 'react-native';

interface Props {
    children: React.ReactNode;
}
export default function KeyboardAvoidingView({ children }: Props) {
    return (
        <KAV style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {children}
        </KAV>
    );
}
