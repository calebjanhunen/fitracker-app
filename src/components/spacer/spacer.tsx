import React from 'react';
import { View } from 'react-native';

interface Props {
    size: keyof typeof spacingOptions;
}

export default function Spacer({ size }: Props): React.ReactElement {
    return <View style={{ height: spacingOptions[size] }}></View>;
}

const spacingOptions = {
    'spacing-1': 4,
    'spacing-2': 8,
    'spacing-3': 12,
    'spacing-4': 16,
    'spacing-5': 20,
    'spacing-6': 24,
    'spacing-7': 28,
    'spacing-8': 32,
};
