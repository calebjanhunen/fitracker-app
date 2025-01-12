import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { Circle } from 'tamagui';

export default function Avatar() {
    return (
        <Circle size={115} backgroundColor='$gray8'>
            <IonIcons name='person-outline' size={70} />
        </Circle>
    );
}
