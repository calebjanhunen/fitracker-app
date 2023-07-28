import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { Chip, ChipContainer, PageView, Spacer, Text } from '../../../../components';

const fitnessGoals = [
    { name: 'Weight Loss', id: 1 },
    { name: 'Endurance/Stamina', id: 2 },
    { name: 'Injury Rehab', id: 3 },
    { name: 'Muscle Gain', id: 4 },
    { name: 'Core Strength and Stability', id: 5 },
    { name: 'Stress Relief', id: 6 },
    { name: 'Flexibility/Mobility', id: 7 },
    { name: 'Cardiovascular Improvements', id: 8 },
    { name: 'Mental Health', id: 9 },
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

export default function FitnessGoals(): React.ReactElement {
    const [selectedChips, setSelectedChips] = useState<number[]>([]);

    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Fitness Goals
            </Text>
            <Text variant='smallTitle' color='light' textAlign='center'>
                Choose at least 3
            </Text>
            <Spacer size='xl' />
            <ChipContainer>
                {fitnessGoals.map((goal) => (
                    <Chip
                        text={goal.name}
                        key={goal.id}
                        onPress={() => {
                            toggleSelectedChip(goal.id, selectedChips, setSelectedChips);
                        }}
                        isSelected={selectedChips.includes(goal.id)}
                    />
                ))}
            </ChipContainer>
        </PageView>
    );
}
