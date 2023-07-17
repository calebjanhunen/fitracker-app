import React from 'react';
import { Text, View } from 'react-native';

import { PortalHost } from '@gorhom/portal';
// import FindFriendsMainScreen from '../features/find-friends/screens/FindFriendsMainScreen';
// import MessagingMainScreen from '../features/messaging/screens/MessagingMainScreen';
// import ProfileMainScreen from '../features/profile/screens/ProfileMainScreen';
// import SocialFeedMainScreen from '../features/social-feed/screens/SocialFeedMainScreen';
// import WorkoutTrackerNavigation from './WorkoutTrackerNavigation';

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
