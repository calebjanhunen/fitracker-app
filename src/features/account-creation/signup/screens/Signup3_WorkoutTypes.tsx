import React, { useContext, useState, type Dispatch, type SetStateAction } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, Chip, ChipContainer, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';
import { workoutTypes } from '../data/WorkoutTypes';
import { SignupDataContext } from '../signup-context/SignupDataContext';
import { SignupActionTypes } from '../signup-context/SignupDataReducer';

type Props = StackScreenProps<RootStackParamList, 'WorkoutTypes'>;

function toggleSelectedChip(
    name: string,
    selectedChips: string[],
    setSelectedChip: Dispatch<SetStateAction<string[]>>
): void {
    const doesNameExist: boolean = selectedChips.includes(name);
    if (!doesNameExist) {
        setSelectedChip((prevChips) => [...prevChips, name]);
    } else {
        setSelectedChip((prevChips) => prevChips.filter((prevChip) => prevChip !== name));
    }
}

export default function WorkoutTypes({ navigation }: Props): React.ReactElement {
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const [selectedChips, setSelectedChips] = useState<string[]>(
        signupData.workoutTypes ? signupData.workoutTypes : []
    );

    const isNextBtnDisabled = selectedChips.length < 2;

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
                    {workoutTypes.map((workoutType, index) => (
                        <Chip
                            text={workoutType}
                            key={index}
                            onPress={() => {
                                toggleSelectedChip(workoutType, selectedChips, setSelectedChips);
                            }}
                            isSelected={selectedChips.includes(workoutType)}
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
                            type: SignupActionTypes.ADD_WORKOUT_TYPES,
                            payload: selectedChips,
                        });
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
