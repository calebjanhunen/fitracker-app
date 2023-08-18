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

type Props = StackScreenProps<RootStackParamList, 'WorkoutTypes'>;

function toggleSelectedChip(
    id: Tables<'workout_types'>['id'],
    selectedChips: Array<Tables<'workout_types'>['id']>,
    setSelectedChip: Dispatch<SetStateAction<Array<Tables<'workout_types'>['id']>>>
): void {
    const doesNameExist: boolean = selectedChips.includes(id);
    if (!doesNameExist) {
        setSelectedChip((prevChips) => [...prevChips, id]);
    } else {
        setSelectedChip((prevChips) => prevChips.filter((prevChip) => prevChip !== id));
    }
}

export default function WorkoutTypes({ navigation }: Props): React.ReactElement {
    const { chips: workoutTypes, isLoading } = useChipData('workout_types');
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const [selectedChips, setSelectedChips] = useState<Array<Tables<'workout_types'>['id']>>(
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
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <ChipContainer>
                        {workoutTypes.map((workoutType, index) => (
                            <Chip
                                text={workoutType.name}
                                key={index}
                                onPress={() => {
                                    toggleSelectedChip(
                                        workoutType.id,
                                        selectedChips,
                                        setSelectedChips
                                    );
                                }}
                                isSelected={selectedChips.includes(workoutType.id)}
                            />
                        ))}
                    </ChipContainer>
                )}
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
        </PageView>
    );
}
