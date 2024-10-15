import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { Button, Spinner, useTheme } from 'tamagui';

interface Props {
    onPress: () => void;
    icon: keyof typeof IonIcons.glyphMap;
    backgroundColor?: keyof ReturnType<typeof useTheme>;
    iconColor?: keyof ReturnType<typeof useTheme>;
    isLoading?: boolean;
}

export default function IconBtn({ onPress, icon, backgroundColor, iconColor, isLoading }: Props) {
    return (
        <Button
            fontWeight='bold'
            paddingHorizontal='$2'
            paddingVertical='$1'
            height='0'
            onPress={onPress}
            backgroundColor={backgroundColor}
        >
            {isLoading ? <Spinner /> : <IonIcons name={icon} size={24} color={iconColor} />}
        </Button>
    );
}
