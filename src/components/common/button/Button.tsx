import React from 'react';
import { Button as Btn, ButtonProps } from 'tamagui';

export default function Button({
    backgroundColor,
    color,
    disabled,
    children,
    ...btnProps
}: ButtonProps) {
    return (
        <Btn
            {...btnProps}
            backgroundColor={disabled ? '$gray6' : backgroundColor}
            color={disabled ? '$gray10' : color}
            fontWeight='bold'
            disabled={disabled}
        >
            {children}
        </Btn>
    );
}
