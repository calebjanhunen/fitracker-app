import React from 'react';

import { FlatList } from 'react-native';
import { Container, Spacer, Text } from '../../../components';
import { type Exercise } from '../../../interfaces/Exercise';
import { type WorkoutTemplate } from '../../../interfaces/WorkoutTemplate';

interface Props {
    template: WorkoutTemplate;
}

export default function WorkoutTemplateCard({ template }: Props): React.ReactElement {
    return (
        <Container width='48%'>
            <Text variant='headline'>{template.name}</Text>
            <Spacer size='xxs' />
            <FlatList
                data={template.exercises.slice(0, 5)}
                renderItem={({ item }) => (
                    <Text variant='subhead' numberOfLines={1}>
                        {item.name}
                    </Text>
                )}
                ItemSeparatorComponent={() => <Spacer size='xxxs' />}
            />
            {template.exercises.length > 5 && (
                <Text variant='subhead' color='light'>
                    {template.exercises.length - 5} More...
                </Text>
            )}
        </Container>
    );
}
