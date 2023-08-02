import React, { useContext, useState, type Dispatch, type SetStateAction } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import { Button, Chip, ChipContainer, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupDataContext } from '../../../../services/signup/SignupDataContext';
import { SignupActionTypes } from '../../../../services/signup/SignupDataReducer';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'WorkoutTypes'>;

interface WorkoutTypesInterface {
    id: number;
    name: string;
}

const workoutTypes: WorkoutTypesInterface[] = [
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
    name: string,
    selectedChips: WorkoutTypesInterface[],
    setSelectedChip: Dispatch<SetStateAction<WorkoutTypesInterface[]>>
): void {
    const indexOfChip = selectedChips.findIndex((chip) => chip.id === id);
    if (indexOfChip === -1) {
        setSelectedChip((prevChips) => [...prevChips, { id, name }]);
    } else {
        setSelectedChip((prevChips) => prevChips.filter((chip) => chip.id !== id));
    }
}

export default function WorkoutTypes({ navigation }: Props): React.ReactElement {
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const [selectedChips, setSelectedChips] = useState<WorkoutTypesInterface[]>(
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
                    {workoutTypes.map((workoutType) => (
                        <Chip
                            text={workoutType.name}
                            key={workoutType.id}
                            onPress={() => {
                                toggleSelectedChip(
                                    workoutType.id,
                                    workoutType.name,
                                    selectedChips,
                                    setSelectedChips
                                );
                            }}
                            isSelected={Boolean(
                                selectedChips.find((chip) => chip.id === workoutType.id)
                            )}
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
