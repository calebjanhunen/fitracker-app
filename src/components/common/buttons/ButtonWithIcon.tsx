import IonIcons from '@expo/vector-icons/Ionicons';
import React, { ComponentProps } from 'react';
import { Button as Btn, SizableText, useTheme } from 'tamagui';
import Button from './button/Button';

interface Props extends ComponentProps<typeof Btn> {
    text: string;
    iconName: ComponentProps<typeof IonIcons>['name'];
}

export default function ButtonWithIcon({ text, iconName, ...btnProps }: Props) {
    const theme = useTheme();
    return (
        <Button
            iconAfter={<IonIcons size={20} color={theme.blue10.val} name={iconName} />}
            {...btnProps}
            autoHeight
            backgroundColor='$blue6'
        >
            <SizableText color='$blue10'>{text}</SizableText>
        </Button>
    );
}
