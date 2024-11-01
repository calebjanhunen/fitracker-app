import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Spinner, useTheme } from 'tamagui';

interface Props {
    onPress: () => void;
    icon: keyof typeof IonIcons.glyphMap;
    backgroundColor?: keyof ReturnType<typeof useTheme>;
    iconColor?: keyof ReturnType<typeof useTheme>;
    isLoading?: boolean;
}

export default function IconBtn({ onPress, icon, backgroundColor, iconColor, isLoading }: Props) {
    return (
        <TouchableOpacity
            style={{ backgroundColor, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 }}
        >
            {isLoading ? <Spinner /> : <IonIcons name={icon} size={24} color={iconColor} />}
        </TouchableOpacity>
    );
}
