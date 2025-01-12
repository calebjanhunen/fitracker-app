import React from 'react';

import { Slot } from 'expo-router';
import { View } from 'tamagui';

export default function LeaderboardLayout() {
    return (
        <View flex={1} paddingHorizontal='$space.3' backgroundColor='$background'>
            <Slot />
        </View>
    );
}
