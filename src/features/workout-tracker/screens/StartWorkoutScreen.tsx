import React from 'react';
import { FlatList, View } from 'react-native';

import { styled } from 'styled-components';

import { Button, Container, PageView, Spacer, Text } from '../../../components';
import { type WorkoutTemplate } from '../../../interfaces/WorkoutTemplate';
import WorkoutTemplateCard from '../components/WorkoutTemplateCard';

const HeaderView = styled(View)`
    padding-top: ${(props) => props.theme.spacing.xs};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export default function StartWorkoutScreen(): React.ReactElement {
    return (
        <PageView>
            <HeaderView>
                <Text variant='headline'>TEMPLATES</Text>
                <Button
                    variant='small'
                    backgroundColor='primary'
                    textColor='white'
                    onPress={() => {
                        // TODO: Link this button to create workout template modal
                    }}
                >
                    CREATE TEMPLATE
                </Button>
            </HeaderView>
            <Spacer size='xs' />
            <FlatList
                style={{ flex: 1 }}
                data={mockWorkoutTemplate}
                numColumns={2}
                renderItem={({ item }) => <WorkoutTemplateCard template={item} />}
                ItemSeparatorComponent={() => <Spacer size='xs' />}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
            <Spacer size='xxs' />
            <Button
                variant='full'
                backgroundColor='primary'
                textColor='white'
                onPress={() => {
                    // TODO: Link this button to workout modal
                }}
            >
                Start Empty Workout
            </Button>
            <Spacer size='xxs' />
        </PageView>
    );
}

const mockWorkoutTemplate: WorkoutTemplate[] = [
    {
        name: 'Push 1',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Lateral Raise (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
    {
        name: 'Push 1',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Lateral Raise (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
    {
        name: 'Push 1',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Lateral Raise (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
    {
        name: 'Push 1',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Lateral Raise (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
    {
        name: 'Push 1',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Lateral Raise (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
    {
        name: 'Push 1',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Lateral Raise (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
    {
        name: 'Push 1',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Lateral Raise (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
];
