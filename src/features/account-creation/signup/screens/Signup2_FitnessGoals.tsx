import React, { useContext, useState, type Dispatch, type SetStateAction } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import { ActivityIndicator } from 'react-native';
import { Button, Chip, ChipContainer, PageView, Spacer, Text } from '../../../../components';
import { useChipData } from '../../../../hooks/useChipData';
import { type Tables } from '../../../../interfaces/Tables';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody } from '../components';
import { SignupDataContext } from '../signup-context/SignupDataContext';
import { SignupActionTypes } from '../signup-context/SignupDataReducer';

function toggleSelectedChip(
    id: Tables<'fitness_goals'>['id'],
    selectedChips: Array<Tables<'fitness_goals'>['id']>,
    setSelectedChip: Dispatch<SetStateAction<Array<Tables<'fitness_goals'>['id']>>>
): void {
    const foundName = selectedChips.includes(id);
    if (!foundName) {
        setSelectedChip((prevIds) => [...prevIds, id]);
    } else {
        setSelectedChip((prevNames) => prevNames.filter((prevIds) => prevIds !== id));
    }
}

type Props = StackScreenProps<RootStackParamList, 'FitnessGoals'>;

export default function FitnessGoals({ navigation }: Props): React.ReactElement {
    const { chips: fitnessGoals, isLoading } = useChipData('fitness_goals');
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const [selectedChips, setSelectedChips] = useState<Array<Tables<'fitness_goals'>['id']>>(
        signupData.fitnessGoals ?? []
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
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
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
                )}
                <Spacer size='xl' />
            </SignupBody>
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
        </PageView>
    );
}
