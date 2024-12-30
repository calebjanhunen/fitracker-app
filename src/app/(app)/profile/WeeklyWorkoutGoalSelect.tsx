import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { IErrorResponse } from 'src/api/client';
import { UserProfileDto } from 'src/api/generated';
import { useUpdateWeeklyWorkoutGoal } from 'src/api/hooks/useUserApi';
import { Button } from 'src/components/common/button';
import { updateWeeklyWorkoutGoal } from 'src/redux/user/UserSlice';
import { Label, RadioGroup, SizableText, Spinner, View, XStack, YStack } from 'tamagui';

export default function WeeklyWorkoutGoalSelect() {
    const { updateWeeklyGoal, isPending } = useUpdateWeeklyWorkoutGoal(onSuccess, onError);
    const router = useRouter();
    const dispatch = useDispatch();
    const { currentGoal } = useLocalSearchParams<{ currentGoal: string }>();
    const [selectedGoal, setSelectedGoal] = useState<number>(Number(currentGoal));

    function onSelect(goal: string) {
        setSelectedGoal(Number(goal));
    }

    function onSuccess(response: UserProfileDto) {
        dispatch(updateWeeklyWorkoutGoal(response.weeklyWorkoutGoal));
        router.back();
    }

    function onError(e: IErrorResponse) {
        Alert.alert('Error updating weekly goal', e.message);
    }
    return (
        <View paddingHorizontal='$space.3' flex={1} backgroundColor='$background'>
            <SizableText size='$3' color='$gray10' paddingVertical='$space.3'>
                Your weekly workout goal lets you set a target for how many workouts you want to
                complete each week. Once you&apos;ve set your goal, you&apos;ll earn XP whenever you
                hit that number of workouts in a week, helping you stay consistent and reach your
                fitness goals.
            </SizableText>
            <YStack flex={1} justifyContent='space-between'>
                <RadioGroup defaultValue={currentGoal}>
                    <FlatList
                        data={['3', '4', '5', '6']}
                        renderItem={({ item }) => (
                            <XStack
                                alignItems='center'
                                justifyContent='space-between'
                                gap='$space.4'
                            >
                                <Label size='$5'>{item} days</Label>
                                <RadioGroup.Item
                                    onPress={() => onSelect(item)}
                                    size='$5'
                                    value={item}
                                    id={`radiogroup-${item}`}
                                >
                                    <RadioGroup.Indicator />
                                </RadioGroup.Item>
                            </XStack>
                        )}
                    />
                </RadioGroup>
                <Button
                    color='$green10'
                    backgroundColor='$green6'
                    onPress={() => updateWeeklyGoal({ weeklyWorkoutGoal: selectedGoal })}
                    disabled={selectedGoal === Number(currentGoal)}
                    marginBottom='$space.3'
                >
                    {isPending ? <Spinner /> : 'Save'}
                </Button>
            </YStack>
        </View>
    );
}
