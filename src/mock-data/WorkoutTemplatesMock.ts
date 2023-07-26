import uuid from 'react-native-uuid';

import { type WorkoutTemplate } from '../interfaces/WorkoutTemplate';

export const mockWorkoutTemplate: WorkoutTemplate[] = [
    {
        name: 'Push 1',
        exercises: [
            {
                name: 'Dumbbell Bench Press',
                id: uuid.v4(),
                numSets: 3,
            },
            {
                name: 'Incline Bench Press (Machine)',
                id: uuid.v4(),
                numSets: 4,
            },
            {
                name: 'Chest Fly (Machine)',
                id: uuid.v4(),
                numSets: 5,
            },
            {
                name: 'Lateral Raise (Cable)',
                id: uuid.v4(),
                numSets: 2,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                id: uuid.v4(),
                numSets: 1,
            },
            {
                name: 'Triceps Extension (Cable)',
                id: uuid.v4(),
                numSets: 3,
            },
        ],
    },
    {
        name: 'Push 2',
        exercises: [
            {
                name: 'Barbell Bench Press',
                id: uuid.v4(),
                numSets: 3,
            },
            {
                name: 'Incline Bench Press (Machine)',
                id: uuid.v4(),
                numSets: 3,
            },
            {
                name: 'Chest Fly (Machine)',
                id: uuid.v4(),
                numSets: 3,
            },
            {
                name: 'Lateral Raise (Cable)',
                id: uuid.v4(),
                numSets: 3,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                id: uuid.v4(),
                numSets: 3,
            },
            {
                name: 'Triceps Extension (Cable)',
                id: uuid.v4(),
                numSets: 3,
            },
        ],
    },
];
