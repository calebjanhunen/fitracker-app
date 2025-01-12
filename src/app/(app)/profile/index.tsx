import React from 'react';

import { useSelector } from 'react-redux';
import { SizableText, useTheme, View } from 'tamagui';

import ProfileHeader from 'src/components/profile/profile/ProfileHeader';
import WorkoutHistoryContainer from 'src/components/profile/workout-history/WorkoutHistoryContainer';
import { RootState } from 'src/redux/Store';

export default function Profile() {
    const user = useSelector((state: RootState) => state.user);
    const theme = useTheme();

    return (
        <View
            flex={1}
            paddingHorizontal='$space.3'
            paddingTop='$2'
            backgroundColor={theme.background.val}
        >
            <ProfileHeader user={user} />
            <SizableText size='$5' fontWeight='bold' color='$blue10'>
                Workout History
            </SizableText>
            <WorkoutHistoryContainer />
        </View>
    );
}
