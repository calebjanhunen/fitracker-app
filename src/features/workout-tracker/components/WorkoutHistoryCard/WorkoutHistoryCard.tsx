import React from 'react';
import { FlatList } from 'react-native';

import { Container, PopupMenu, Spacer, Text } from '../../../../components';
import { type MenuOptionProps } from '../../../../components/PopupMenu/PopupMenu';
import useDeleteWorkout from '../../../../hooks/workouts/useDeleteWorkout';
import { type Workout } from '../../../../interfaces/Workout';
import { pluralizeWord } from '../../../../utils/PluarlizeWord';
import { Header, Title } from './Styles';

interface Props {
    workout: Workout;
}

export default function WorkoutHistoryCard({ workout }: Props): React.ReactElement {
    const date = new Date(workout.dateCreated);
    const { initDeleteWorkout } = useDeleteWorkout();
    const menuOptions: MenuOptionProps[] = [
        {
            text: 'Delete',
            icon: 'trash',
            iconColor: 'error',
            onSelect: deleteWorkout,
        },
    ];

    async function deleteWorkout(): Promise<void> {
        await initDeleteWorkout(workout.id);
    }

    return (
        <Container
            onPress={() => {
                // TODO: Open workout history modal
            }}
        >
            <Header>
                <Title>
                    <Text variant='headline'>{workout.name}</Text>
                    <Text variant='subhead' color='light'>
                        {date.toDateString()}
                    </Text>
                </Title>
                <PopupMenu triggerIcon='ellipsis-vertical' menuOptions={menuOptions} />
            </Header>
            <Spacer size='xxs' />
            <Text variant='headline'>Exercises</Text>
            <FlatList
                data={workout.exercises}
                renderItem={({ item }) => (
                    <Text variant='body'>
                        {item.name?.name}: {item.sets.length}{' '}
                        {pluralizeWord(item.sets.length, 'set')}
                    </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </Container>
    );
}
