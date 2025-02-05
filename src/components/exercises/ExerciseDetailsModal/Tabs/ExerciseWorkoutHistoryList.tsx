import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ExerciseWorkoutHistoryDto } from 'src/api/generated';
import { SizableText, View } from 'tamagui';
import ExerciseWorkoutHistoryListItem from './ExerciseWorkoutHistoryListItem';

interface Props {
    workoutHistoryList: ExerciseWorkoutHistoryDto[];
}

export default function ExerciseWorkoutHistory({ workoutHistoryList }: Props) {
    return (
        <FlatList
            ListEmptyComponent={
                <SizableText textAlign='center'>
                    This exercise has not been used in an workout yet.
                </SizableText>
            }
            style={{ flex: 1 }}
            data={workoutHistoryList}
            ItemSeparatorComponent={() => <View height='$space.4' />}
            renderItem={({ item }) => <ExerciseWorkoutHistoryListItem workoutHistory={item} />}
        />
    );
}
