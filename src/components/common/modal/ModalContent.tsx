import React from 'react';
import { Dialog, DialogContentProps } from 'tamagui';

interface Props extends DialogContentProps {
    children: React.ReactNode;
}
export default function ModalContent({ children, ...dialogContentProps }: Props) {
    return (
        <Dialog.Content
            zIndex={2}
            animateOnly={['transform', 'opacity']}
            animation={[
                '100ms',
                {
                    opacity: {
                        overshootClamping: true,
                    },
                },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            {...dialogContentProps}
        >
            {children}
        </Dialog.Content>
    );
}
