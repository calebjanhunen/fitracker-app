import { List, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
    index: number;
}

export default function WorkoutTemplateItem({ index }: Props): React.ReactElement {
    const renderItem = (): React.ReactElement => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 6, flex: 1 }}>
            <Text category='p2' numberOfLines={1} style={{ flex: 1 }}>
                Exercise 1
            </Text>
            <Text category='p2' appearance='hint'>
                2 sets
            </Text>
        </View>
    );

    function onTemplatePress(): void {
        console.log('pressed');
    }

    return (
        <TouchableOpacity
            style={[styles.templateContainer, { marginRight: index % 2 === 0 ? 16 : 0 }]}
            onPress={onTemplatePress}
        >
            <Text category='h6'>Pull 1</Text>
            <List data={[0, 0, 0]} renderItem={renderItem} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
