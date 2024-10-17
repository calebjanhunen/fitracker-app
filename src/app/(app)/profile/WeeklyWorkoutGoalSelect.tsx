import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { IErrorResponse } from 'src/api/client';
import { Button } from 'src/components/common/button';
import { useUpdateWeeklyWorkoutGoal } from 'src/hooks/profile/useUpdateWeeklyWorkoutGoal';
import { Label, RadioGroup, Spinner, View, XStack } from 'tamagui';

export default function WeeklyWorkoutGoalSelect() {
    const { updateGoal, isPending } = useUpdateWeeklyWorkoutGoal(onSuccess, onError);
    const router = useRouter();
    const { currentGoal } = useLocalSearchParams<{ currentGoal: string }>();
    const [selectedGoal, setSelectedGoal] = useState<number>(Number(currentGoal));

    function onSelect(goal: string) {
        setSelectedGoal(Number(goal));
    }

    function onSuccess() {
        router.back();
    }

    function onError(e: IErrorResponse) {
        Alert.alert('Error updating weekly goal', e.message);
    }
    return (
        <View paddingHorizontal='$space.3'>
            <RadioGroup defaultValue={currentGoal}>
                <FlatList
                    data={['3', '4', '5', '6']}
                    renderItem={({ item }) => (
                        <XStack alignItems='center' justifyContent='space-between' gap='$space.4'>
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
                onPress={() => updateGoal({ weeklyWorkoutGoal: selectedGoal })}
                disabled={selectedGoal === Number(currentGoal)}
            >
                {isPending ? <Spinner /> : 'Save'}
            </Button>
        </View>
    );
}
