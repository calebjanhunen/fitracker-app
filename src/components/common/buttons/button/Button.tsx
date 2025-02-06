import React, { ComponentProps } from 'react';
import { Button as Btn, TamaguiElement } from 'tamagui';

interface Props extends ComponentProps<typeof Btn> {
    autoHeight?: boolean;
}
const Button = React.forwardRef<TamaguiElement, Props>(function Button(
    { backgroundColor, color, disabled, children, autoHeight, ...btnProps },
    ref
) {
    return (
        <Btn
            ref={ref}
            {...btnProps}
            backgroundColor={disabled ? '$gray6' : backgroundColor}
            color={disabled ? '$gray10' : color}
            fontWeight='bold'
            disabled={disabled}
            height={autoHeight ? 'auto' : btnProps.height}
        >
            {children}
        </Btn>
    );
});

export default Button;
