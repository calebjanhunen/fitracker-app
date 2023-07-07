import React from 'react';
import { View } from 'react-native';

import { styled } from 'styled-components';
import { Spacer, Text } from '../../../components';

const Container = styled(View)`
    padding: ${(props) => props.theme.spacing.md};
    border: 1px solid ${(props) => props.theme.colors.black};
    border-radius: ${(props) => props.theme.borderRadius};
`;

export default function WorkoutHistoryCard(): React.ReactElement {
    return (
        <Container>
            <Text variant='headline'>Push</Text>
            <Text variant='subhead' color='light'>
                Wednesday July 5th, 2023
            </Text>
            <Spacer size='xxs' />
            <Text variant='headline'>Exercises</Text>
            <Text variant='body'>Barbell Bench Press: 3 sets</Text>
            <Text variant='body'>Incline Bench Press: 3 sets</Text>
            <Text variant='body'>Chest Fly: 3 sets</Text>
            <Text variant='body'>Cable Lateral Raise: 3 sets</Text>
            <Text variant='body'>Skullcrushers: 3 sets</Text>
            <Text variant='body'>Triceps Extension (Cable): 3 sets</Text>
        </Container>
    );
}
