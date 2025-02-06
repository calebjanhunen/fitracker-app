import React from 'react';
import { Button as Btn, ButtonProps, TamaguiElement } from 'tamagui';

const Button = React.forwardRef<TamaguiElement, ButtonProps>(function Button(
    { backgroundColor, color, disabled, children, ...btnProps },
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
        >
            {children}
        </Btn>
    );
});

export default Button;
