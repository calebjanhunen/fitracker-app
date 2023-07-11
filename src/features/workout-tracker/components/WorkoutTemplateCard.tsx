import React from 'react';

import { FlatList } from 'react-native';
import { Container, Spacer, Text } from '../../../components';
import { type WorkoutTemplate } from '../../../interfaces/WorkoutTemplate';

interface Props {
    template: WorkoutTemplate;
    setModalVisible: (val: boolean) => void;
    setModalData: (val: WorkoutTemplate | ((prevVal: WorkoutTemplate) => WorkoutTemplate)) => void;
}

const NUM_EXERCISES_DISPLAYED = 5;

export default function WorkoutTemplateCard({
    template,
    setModalVisible,
    setModalData,
}: Props): React.ReactElement {
    return (
        <Container
            width='48%'
            onPress={() => {
                setModalVisible(true);
                setModalData(template);
            }}
        >
            <Text variant='headline'>{template.name}</Text>
            <Spacer size='xxs' />
            <FlatList
                data={template.exercises.slice(0, NUM_EXERCISES_DISPLAYED)}
                renderItem={({ item }) => (
                    <Text variant='subhead' numberOfLines={1}>
                        {item.name}
                    </Text>
                )}
                ItemSeparatorComponent={() => <Spacer size='xxxs' />}
            />
            {template.exercises.length > NUM_EXERCISES_DISPLAYED && (
                <Text variant='subhead' color='light'>
                    {template.exercises.length - NUM_EXERCISES_DISPLAYED} More...
                </Text>
            )}
        </Container>
    );
}
