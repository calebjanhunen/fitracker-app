import IonIcons from '@expo/vector-icons/Ionicons';
import React, { ComponentProps } from 'react';
import { Button } from '../button';

interface Props extends ComponentProps<typeof Button> {
    iconName: keyof typeof IonIcons.glyphMap;
    iconColor?: string;
    iconSize?: number;
}

export default function IconBtnV2({ iconName, iconColor, iconSize, ...props }: Props) {
    return (
        <Button {...props} autoHeight paddingHorizontal={8} paddingVertical={3} borderRadius={10}>
            <IonIcons name={iconName} size={iconSize} color={iconColor} />
        </Button>
    );
}
