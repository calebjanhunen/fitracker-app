import React, { useContext, useState, type Dispatch, type SetStateAction } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, Chip, ChipContainer, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { fitnessGoals } from '../../../../utils/FitnessGoals';
import { SignupBody, SignupFooter } from '../components';
import { SignupDataContext } from '../signup-context/SignupDataContext';
import { SignupActionTypes } from '../signup-context/SignupDataReducer';

function toggleSelectedChip(
    name: string,
    selectedChips: string[],
    setSelectedChip: Dispatch<SetStateAction<string[]>>
): void {
    const foundName = selectedChips.includes(name);
    if (!foundName) {
        setSelectedChip((prevNames) => [...prevNames, name]);
    } else {
        setSelectedChip((prevNames) => prevNames.filter((prevName) => prevName !== name));
    }
}

type Props = StackScreenProps<RootStackParamList, 'FitnessGoals'>;

export default function FitnessGoals({ navigation }: Props): React.ReactElement {
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const [selectedChips, setSelectedChips] = useState<string[]>([]);

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
                    {fitnessGoals.map((goal, index) => (
                        <Chip
                            text={goal}
                            key={index}
                            onPress={() => {
                                toggleSelectedChip(goal, selectedChips, setSelectedChips);
                            }}
                            isSelected={selectedChips.includes(goal)}
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
