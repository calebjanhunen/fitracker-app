import React from 'react';
import { FlatList, View } from 'react-native';

import { styled } from 'styled-components';
import { Container, Spacer, Text } from '../../../components';
import { type Workout } from '../../../interfaces/Workout';

interface Props {
    workout: Workout;
}

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
