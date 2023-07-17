import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { styled } from 'styled-components';
import { PageView, TextInput } from '../../../../components';

interface Props {
    sheetRef: React.RefObject<BottomSheetModal>;
    isBottomSheetHidden: boolean;
    setIsBottomSheetHidden: (val: boolean) => void;
}

const CustomBottomSheetModal = styled(BottomSheetModal)<{
    sheetHidden: boolean;
}>`
    border-radius: ${(props) => props.theme.borderRadius};
    ${(props) => (props.sheetHidden ? 'display: none;' : '')}
    background-color: ${(props) => props.theme.colors.white};
`;

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
            <View>
                <TextInput
                    variant='smallTitle'
                    placeholder='Enter Workout Name...'
                    value={workoutName}
                    onChangeText={changeWorkoutName}
                />
            </View>
        </CustomBottomSheetModal>
    );
}

const shadowStyle = {
    // backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
};
