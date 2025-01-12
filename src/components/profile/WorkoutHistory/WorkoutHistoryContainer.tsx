import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useGetWorkouts } from 'src/api/hooks/useWorkoutApi';
import { SizableText, Spinner, View } from 'tamagui';
import WorkoutHistoryCard from './WorkoutHistoryCard';

export default function WorkoutHistoryContainer() {
    const { data: workouts, isLoading, error, isSuccess } = useGetWorkouts();

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <SizableText fontWeight='bold' color='$red10' textAlign='center'>
                {error.message}
            </SizableText>
        );
    }

    if (isSuccess && !workouts?.length) {
        return (
            <SizableText textAlign='center' paddingTop='$space.3' fontWeight='bold'>
                You have not completed any workouts
            </SizableText>
        );
    }
    return (
        <View paddingTop='$space.2' flex={1}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={workouts}
                renderItem={({ item }) => <WorkoutHistoryCard workout={item} />}
                ItemSeparatorComponent={() => <View height='$1' />}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
            />
        </View>
    );
}
