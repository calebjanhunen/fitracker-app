import React from 'react';
import { Dialog, DialogOverlayProps } from 'tamagui';

interface Props extends DialogOverlayProps {}

export default function ModalOverlay({ ...dialogOverlayProps }: Props) {
    return (
        <Dialog.Overlay
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
