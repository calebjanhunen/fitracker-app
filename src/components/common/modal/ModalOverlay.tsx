import React from 'react';
import { Dialog, DialogOverlayProps } from 'tamagui';

interface Props extends DialogOverlayProps {
    key: string;
}

export default function ModalOverlay({ key, ...dialogOverlayProps }: Props) {
    return (
        <Dialog.Overlay
            key={key}
            flex={1}
            zIndex={1}
            animation='100ms'
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            {...dialogOverlayProps}
        />
    );
}
