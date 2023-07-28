import React, { useState, type Dispatch, type SetStateAction } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, Chip, ChipContainer, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'WorkoutTypes'>;

const workoutTypes = [
    { name: 'Strength Training', id: 1 },
    { name: 'Cardio', id: 2 },
    { name: 'Weight Lifting', id: 3 },
    { name: 'Endurance/Stamina', id: 4 },
    { name: 'Yoga', id: 5 },
    { name: 'Pilates', id: 6 },
    { name: 'Functional Training', id: 7 },
    { name: 'Circuit Training', id: 8 },
    { name: 'Bodyweight Exercises', id: 9 },
];

function toggleSelectedChip(
    id: number,
    selectedChips: number[],
    setSelectedChip: Dispatch<SetStateAction<number[]>>
): void {
    const indexOfChip = selectedChips.indexOf(id);
    console.log(indexOfChip);
    if (indexOfChip === -1) {
        setSelectedChip((prevChips) => [...prevChips, id]);
    } else {
        setSelectedChip((prevChips) => prevChips.filter((chipId) => chipId !== id));
    }
}

export default function WorkoutTypes({ navigation }: Props): React.ReactElement {
    const [selectedChips, setSelectedChips] = useState<number[]>([]);

    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Workout Types
            </Text>
            <Text variant='smallTitle' color='light' textAlign='center'>
                Choose at least 2
            </Text>
            <SignupBody>
                <ChipContainer>
                    {workoutTypes.map((workoutType) => (
                        <Chip
                            text={workoutType.name}
                            key={workoutType.id}
                            onPress={() => {
                                toggleSelectedChip(workoutType.id, selectedChips, setSelectedChips);
                            }}
                            isSelected={selectedChips.includes(workoutType.id)}
                        />
                    ))}
                </ChipContainer>
                <Spacer size='xl' />
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    onPress={() => {
                        navigation.push('SkillLevel');
                    }}
                >
                    Next
                </Button>
                <Spacer size='xl' />
            </SignupBody>
            <SignupFooter navigation={navigation} />
        </PageView>
    );
}
