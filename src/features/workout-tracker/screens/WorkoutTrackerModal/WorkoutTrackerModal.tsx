import React, { useEffect, useRef, useState } from 'react';

import { type BottomSheetModal } from '@gorhom/bottom-sheet';

import { Animated, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Spacer, Text, TextInput } from '../../../../components';
import WorkoutTrackerExercise from '../../components/WorkoutTrackerExercise/WorkoutTrackerExercise';
import {
    CustomBottomSheetModal,
    Header,
    HeaderButton,
    Line,
    PaddedContainer,
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
    const [hasScrolled, setHasScrolled] = useState<boolean>(false);
    const snapPoints = ['1%', '92%'];
    const opacityAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;

    hasScrolled
        ? Animated.timing(opacityAnimation, {
              toValue: 100,
              duration: 50,
              useNativeDriver: true,
          }).start()
        : Animated.timing(opacityAnimation, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
          }).start();

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

    function onExerciseListScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void {
        if (event.nativeEvent.contentOffset.y > 0) {
            setHasScrolled(true);
        } else {
            setHasScrolled(false);
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
                <PaddedContainer>
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
                </PaddedContainer>
                <Line style={{ opacity: opacityAnimation }} />
                <FlatList
                    onScroll={onExerciseListScroll}
                    style={{ flex: 1 }}
                    data={[0, 1, 2]}
                    renderItem={() => <WorkoutTrackerExercise />}
                    ItemSeparatorComponent={() => <Spacer size='xl' />}
                    ListFooterComponent={WorkoutModalFooter}
                    contentContainerStyle={{ padding: 16 }}
                />
            </WorkoutModalView>
        </CustomBottomSheetModal>
    );
}

function WorkoutModalFooter(): React.ReactElement {
    return (
        <View>
            <Spacer size='xxl' />
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
            <Spacer size='xxl' />
        </View>
    );
}
