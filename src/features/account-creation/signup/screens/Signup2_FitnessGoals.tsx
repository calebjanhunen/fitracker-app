import { type StackScreenProps } from '@react-navigation/stack';
import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { Button, Chip, ChipContainer, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';

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

type Props = StackScreenProps<RootStackParamList, 'FitnessGoals'>;

export default function FitnessGoals({ navigation }: Props): React.ReactElement {
    const [selectedChips, setSelectedChips] = useState<number[]>([]);
    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Fitness Goals
            </Text>
            <Text variant='smallTitle' color='light' textAlign='center'>
                Choose at least 3
            </Text>
            <SignupBody>
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
                <Spacer size='xl' />
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    onPress={() => {
                        navigation.push('WorkoutTypes');
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
