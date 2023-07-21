import React from 'react';
import { View } from 'react-native';

import { PortalHost } from '@gorhom/portal';

interface Props {
    screenComponent: React.ReactElement;
}

export default function ScreenDisplay({ screenComponent }: Props): React.ReactElement {
    return (
        <View style={{ flex: 1 }}>
            {screenComponent}
            <PortalHost name='ResumeWorkoutButtonHost' />
        </View>
    );
}
