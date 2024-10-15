import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { Button } from 'tamagui';

interface Props {
    onPress: () => void;
    icon: keyof typeof IonIcons.glyphMap;
}

export default function IconBtn({ onPress, icon }: Props) {
    return (
        <Button
            fontWeight='bold'
            paddingHorizontal='$2'
            paddingVertical='$1'
            height='0'
            onPress={onPress}
        >
            <IonIcons name={icon} size={24} />
        </Button>
    );
}
