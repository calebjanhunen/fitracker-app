import React, { useState } from 'react';

import { type BottomSheetModal } from '@gorhom/bottom-sheet';

import { Button, Spacer, Text, TextInput } from '../../../../components';
import WorkoutTrackerExercise from '../../components/WorkoutTrackerExercise/WorkoutTrackerExercise';
import {
    CustomBottomSheetModal,
    Header,
    HeaderButton,
    WorkoutModalView,
    shadowStyle,
} from './WorkoutTrackerModalStyles';

interface Props {
    sheetRef: React.RefObject<BottomSheetModal>;
    isBottomSheetHidden: boolean;
    setIsBottomSheetHidden: (val: boolean) => void;
}

export default function WorkoutTrackerModal(props: Props): React.ReactElement {
    const [workoutName, setWorkoutName] = useState<string>('');
    const snapPoints = ['1%', '92%'];

    const changeWorkoutName = (text: string): void => {
        setWorkoutName(text);
    };

    function onSheetChange(index: number): void {
        if (index === 0) {
            props.setIsBottomSheetHidden(true);
        } else {
            props.setIsBottomSheetHidden(false);
        }
    }

    return (
        <CustomBottomSheetModal
            index={1}
            ref={props.sheetRef}
            snapPoints={snapPoints}
            style={shadowStyle}
            sheetHidden={props.isBottomSheetHidden}
            onChange={onSheetChange}
        >
            <WorkoutModalView>
                <Header>
                    <HeaderButton
                        backgroundColor='error'
                        onPress={() => {
                            // TODO: Clear workout states and close modal
                        }}
                    >
                        <Text variant='button' color='white'>
                            Cancel
                        </Text>
                    </HeaderButton>
                    <HeaderButton
                        backgroundColor='success'
                        onPress={() => {
                            // TODO: call finish workout api (future)
                        }}
                    >
                        <Text variant='button' color='white'>
                            Finish
                        </Text>
                    </HeaderButton>
                </Header>
                <Spacer size='xs' />
                <TextInput
                    variant='smallTitle'
                    placeholder='Enter Workout Name...'
                    value={workoutName}
                    onChangeText={changeWorkoutName}
                />
                <Spacer size='xl' />
                <WorkoutTrackerExercise />
                <Spacer size='md' />
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    onPress={() => {
                        // TODO: open add exercise modal
                    }}
                >
                    Add Exercise
                </Button>
            </WorkoutModalView>
        </CustomBottomSheetModal>
    );
}
