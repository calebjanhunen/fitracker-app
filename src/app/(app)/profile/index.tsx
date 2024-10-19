import IonIcons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import ProfileHeader from 'src/components/profile/profile/ProfileHeader';
import WorkoutHistoryTab from 'src/components/profile/workout-history/WorkoutHistoryTab';
import { RootState } from 'src/redux/Store';
import { Separator, SizableText, Tabs, useTheme, View } from 'tamagui';

export default function Profile() {
    const user = useSelector((state: RootState) => state.user);
    const theme = useTheme();
    const router = useRouter();

    return (
        <View flex={1} alignItems='center' paddingTop='$2' backgroundColor={theme.background.val}>
            <Stack.Screen
                options={{
                    title: user.username,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push('/profile/ProfileSettings')}>
                            <IonIcons color={theme.gray12.val} size={34} name='menu-outline' />
                        </TouchableOpacity>
                    ),
                }}
            />
            <ProfileHeader user={user} />
            <Tabs
                defaultValue='workout-history'
                flexDirection='column'
                orientation='horizontal'
                width={Dimensions.get('window').width}
                flex={1}
            >
                <Tabs.List borderRadius={0}>
                    <Tabs.Tab value='workout-history' flex={1}>
                        <SizableText fontWeight='bold' color='$blue10'>
                            Workout History
                        </SizableText>
                    </Tabs.Tab>
                    <Separator vertical />
                    <Tabs.Tab value='account-info' flex={1}>
                        <SizableText fontWeight='bold' color='$blue10'>
                            Account Info
                        </SizableText>
                    </Tabs.Tab>
                </Tabs.List>
                <Separator />
                <Tabs.Content flex={1} value='workout-history' paddingHorizontal='$4'>
                    <WorkoutHistoryTab />
                </Tabs.Content>

                <Tabs.Content value='account-info' paddingHorizontal='$space.2'></Tabs.Content>
            </Tabs>
        </View>
    );
}
