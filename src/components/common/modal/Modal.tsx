import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Dialog, DialogProps } from 'tamagui';

interface Props extends DialogProps {
    avoidKeyboard?: boolean;
}

export default function Modal({ children, avoidKeyboard = false, ...dialogProps }: Props) {
    return (
        <Dialog {...dialogProps} modal>
            {avoidKeyboard ? (
                <KeyboardAvoidingView
                    style={{
                        width: '100%',
                        flex: 1,
                        zIndex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Dialog.Portal>{children}</Dialog.Portal>
                </KeyboardAvoidingView>
            ) : (
                <Dialog.Portal>{children}</Dialog.Portal>
            )}
        </Dialog>
    );
}
