import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { Circle } from 'tamagui';

interface Props {
    size: number;
}

export default function Avatar({ size }: Props) {
    return (
        <Circle size={size} backgroundColor='$gray9'>
            <IonIcons name='person-outline' size={size / 2.5} />
        </Circle>
    );
}
