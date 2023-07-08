import React from 'react';
import { FlatList, View } from 'react-native';

import { styled } from 'styled-components';
import { Spacer, Text } from '../../../components';
import { type Workout } from '../../../interfaces/Workout';

interface Props {
    workout: Workout;
}

const Container = styled(View)`
    padding: ${(props) => props.theme.spacing.md};
    border: 1px solid ${(props) => props.theme.colors.black};
    border-radius: ${(props) => props.theme.borderRadius};
`;

export default function WorkoutHistoryCard({ workout }: Props): React.ReactElement {
    return (
        <Container>
            <Text variant='headline'>{workout.name}</Text>
            <Text variant='subhead' color='light'>
                {workout.dateCreated}
            </Text>
            <Spacer size='xxs' />
            <Text variant='headline'>Exercises</Text>
            <FlatList
                data={workout.exercises}
                renderItem={({ item }) => (
                    <Text variant='body'>
                        {item.name}: {item.sets} sets
                    </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </Container>
    );
}
