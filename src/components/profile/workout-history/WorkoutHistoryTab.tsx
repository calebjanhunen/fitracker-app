import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'tamagui';
import WorkoutHistoryCard from './WorkoutHistoryCard';

export default function WorkoutHistoryTab() {
    return (
        <View paddingTop='$space.2'>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[0, 0, 0, 0, 0, 0]}
                renderItem={() => <WorkoutHistoryCard />}
                ItemSeparatorComponent={() => <View height='$1' />}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
            />
        </View>
    );
}
