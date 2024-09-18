import IonIcons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import WorkoutHistoryTab from 'src/components/profile/workout-history/WorkoutHistoryTab';
import { RootState } from 'src/redux/Store';
import { Circle, H3, H5, Separator, SizableText, Tabs, View, XStack } from 'tamagui';

export default function Profile() {
    const user = useSelector((state: RootState) => state.user);

    return (
        <View flex={1} alignItems='center' marginTop='$2'>
            <Circle size={100} backgroundColor='$gray8'>
                <IonIcons name='person-outline' size={70} />
            </Circle>
            <H3 paddingTop='$space.2'>
                {user.firstName} {user.lastName}
            </H3>
            <XStack gap='$space.2'>
                <H5>XP:</H5>
                <H5>{user.totalXp}</H5>
            </XStack>
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

                <Tabs.Content value='account-info'>
                    <H5>Account Info</H5>
                </Tabs.Content>
            </Tabs>
        </View>
    );
}
