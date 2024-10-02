import React from 'react';
import { Dialog, DialogProps } from 'tamagui';

export default function Modal({ children, ...dialogProps }: DialogProps) {
    return <Dialog {...dialogProps}>{children}</Dialog>;
}
