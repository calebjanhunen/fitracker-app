import { type StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState, type Dispatch, type SetStateAction } from 'react';
import { Button, Chip, ChipContainer, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupDataContext } from '../../../../services/signup/SignupDataContext';
import { SignupActionTypes } from '../../../../services/signup/SignupDataReducer';
import { SignupBody, SignupFooter } from '../components';

interface FitnessGoalsInterface {
    id: number;
    name: string;
}

const fitnessGoals: FitnessGoalsInterface[] = [
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
    name: string,
    selectedChips: FitnessGoalsInterface[],
    setSelectedChip: Dispatch<SetStateAction<FitnessGoalsInterface[]>>
): void {
    const indexOfChip = selectedChips.findIndex((chip) => chip.id === id);
    if (indexOfChip === -1) {
        setSelectedChip((prevChips) => [...prevChips, { id, name }]);
    } else {
        setSelectedChip((prevChips) => prevChips.filter((chip) => chip.id !== id));
    }
}

type Props = StackScreenProps<RootStackParamList, 'FitnessGoals'>;

export default function FitnessGoals({ navigation }: Props): React.ReactElement {
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const [selectedChips, setSelectedChips] = useState<FitnessGoalsInterface[]>(
        signupData.fitnessGoals ? signupData.fitnessGoals : []
    );

    const isNextBtnDisabled = selectedChips.length < 3;

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
                                toggleSelectedChip(
                                    goal.id,
                                    goal.name,
                                    selectedChips,
                                    setSelectedChips
                                );
                            }}
                            isSelected={Boolean(selectedChips.find((chip) => chip.id === goal.id))}
                        />
                    ))}
                </ChipContainer>
                <Spacer size='xl' />
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    disabled={isNextBtnDisabled}
                    onPress={() => {
                        dispatchSignupData({
                            type: SignupActionTypes.ADD_FITNESS_GOALS,
                            payload: selectedChips,
                        });
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
