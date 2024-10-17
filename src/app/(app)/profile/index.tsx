import IonIcons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutHistoryTab from 'src/components/profile/workout-history/WorkoutHistoryTab';
import { useLocalStorage } from 'src/hooks/common/useLocalStorage';
import { RootState } from 'src/redux/Store';
import { updateWeeklyWorkoutGoal } from 'src/redux/user/UserSlice';
import { Circle, H3, H5, Separator, SizableText, Tabs, useTheme, View, XStack } from 'tamagui';

export default function Profile() {
    const user = useSelector((state: RootState) => state.user);
    const { getFromStorage } = useLocalStorage();
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter();

    // TODO: Remove after adding weekly workout goal to get user api call
    useEffect(() => {
        getFromStorage('weekly-workout-goal')
            .then((response) => {
                dispatch(updateWeeklyWorkoutGoal(Number(response)));
            })
            .catch((e) => {});
    });

    return (
        <View flex={1} alignItems='center' paddingTop='$2' backgroundColor='$background'>
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

                <Tabs.Content value='account-info' paddingHorizontal='$space.2'>
                    <XStack
                        alignItems='center'
                        justifyContent='space-between'
                        marginTop='$space.3'
                        onPress={() =>
                            router.push({
                                pathname: '/profile/WeeklyWorkoutGoalSelect',
                                params: { currentGoal: user.weeklyWorkoutGoal.toString() },
                            })
                        }
                    >
                        <XStack alignItems='center' gap='$space.2'>
                            <IonIcons name='flag-outline' size={24} />
                            <SizableText size='$5'>Weekly Workout Goal</SizableText>
                        </XStack>
                        <XStack alignItems='center' gap='$space.1'>
                            <SizableText size='$5' color='$gray10'>
                                {user.weeklyWorkoutGoal}
                            </SizableText>
                            <IonIcons
                                name='chevron-forward-outline'
                                size={24}
                                color={theme.gray10.val}
                            />
                        </XStack>
                    </XStack>
                </Tabs.Content>
            </Tabs>
        </View>
    );
}
