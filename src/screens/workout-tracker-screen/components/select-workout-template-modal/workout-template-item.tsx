import { List, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { WorkoutTemplateExercise } from 'src/interfaces';

interface Props {
    name: string;
    exercises: WorkoutTemplateExercise[];
    index: number;
}

export default function WorkoutTemplateItem({ name, exercises, index }: Props): React.ReactElement {
    const renderItem = ({ item }: { item: WorkoutTemplateExercise }): React.ReactElement => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 4, flex: 1 }}>
            <Text category='p2' numberOfLines={1} style={{ flex: 1 }}>
                {item.sets.length} x {item.name}
            </Text>
            {/* <Text category='p2' appearance='hint'>
                {item.sets.length} sets
            </Text> */}
        </View>
    );

    function onTemplatePress(): void {
        console.log('pressed');
    }

    return (
        <TouchableOpacity
            style={[styles.templateContainer, { marginRight: index % 2 === 0 ? 6 : 0 }]}
            onPress={onTemplatePress}
        >
            <Text category='h6'>{name}</Text>
            <List
                style={styles.exerciseList}
                data={exercises}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    exerciseList: {
        backgroundColor: 'transparent',
    },
    templateContainer: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        overflow: 'hidden',
        width: 160,
    },
});
