import IonIcons from '@expo/vector-icons/Ionicons';
import React, { ComponentProps } from 'react';
import { useTheme } from 'tamagui';
import { Button } from '../button';

interface Props extends ComponentProps<typeof Button> {
    iconName: keyof typeof IonIcons.glyphMap;
    iconColor?: string;
    iconSize?: number;
}

export default function IconBtnV2({
    iconName,
    iconColor,
    iconSize,
    disabled,
    backgroundColor,
    ...props
}: Props) {
    const theme = useTheme();
    return (
        <Button
            {...props}
            autoHeight
            paddingHorizontal={8}
            paddingVertical={3}
            borderRadius={10}
            backgroundColor={disabled ? theme.gray3.val : backgroundColor}
        >
            <IonIcons
                name={iconName}
                size={iconSize}
                color={disabled ? theme.gray8.val : iconColor}
            />
        </Button>
    );
}
