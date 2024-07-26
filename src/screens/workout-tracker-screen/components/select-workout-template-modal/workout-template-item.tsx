/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { List, Text, useTheme } from '@ui-kitten/components';
import React, { type Dispatch, type SetStateAction } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { WorkoutTemplate, WorkoutTemplateExercise } from 'src/interfaces';

interface Props {
    workoutTemplate: WorkoutTemplate;
    index: number;
    isSelected: boolean;
    setSelectedWT: Dispatch<SetStateAction<WorkoutTemplate | null>>;
}

export default function WorkoutTemplateItem({
    workoutTemplate,
    index,
    isSelected,
    setSelectedWT,
}: Props): React.ReactElement {
    const theme = useTheme();
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

    return (
        <TouchableOpacity
            style={[
                styles.templateContainer,
                {
                    marginRight: index % 2 === 0 ? 6 : 0,
                    backgroundColor: isSelected
                        ? theme['color-primary-transparent-200']
                        : 'transparent',
                },
            ]}
            onPress={() => setSelectedWT(workoutTemplate)}
        >
            <Text category='h6'>{workoutTemplate.name}</Text>
            <List
                style={styles.exerciseList}
                data={workoutTemplate.exercises}
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
