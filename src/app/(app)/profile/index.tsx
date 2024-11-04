import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { Link, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
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
            <Stack.Screen
                options={{
                    title: user.username,
                    headerRight: () => (
                        <Link href='/profile/ProfileSettings' asChild>
                            <TouchableOpacity>
                                <IonIcons color={theme.gray12.val} size={34} name='menu-outline' />
                            </TouchableOpacity>
                        </Link>
                    ),
                }}
            />
            <ProfileHeader user={user} />
            <SizableText size='$5' fontWeight='bold' color='$blue10'>
                Workout History
            </SizableText>
            <WorkoutHistoryContainer />
        </View>
    );
}
