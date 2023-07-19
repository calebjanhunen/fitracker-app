import React, { useRef, useState, type Dispatch, type SetStateAction } from 'react';

import { type BottomSheetModal } from '@gorhom/bottom-sheet';

import { Animated, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Spacer, Text, TextInput } from '../../../../components';
import { type Exercise } from '../../../../interfaces/Exercise';
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

interface WorkoutModalFooterProps {
    exercises: Exercise[];
    setExercises: Dispatch<SetStateAction<Exercise[]>>;
}

export default function WorkoutTrackerModal(props: Props): React.ReactElement {
    const [workoutName, setWorkoutName] = useState<string>('');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const snapPoints = ['1%', '92%'];
    const opacityAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;

    const changeWorkoutName = (text: string): void => {
        setWorkoutName(text);
    };

    function onSheetChangePosition(index: number): void {
        index === 0 ? props.setIsBottomSheetHidden(true) : props.setIsBottomSheetHidden(false);
    }

    function onExerciseListScroll(event: NativeSyntheticEvent<NativeScrollEvent>): void {
        event.nativeEvent.contentOffset.y > 0
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
    }

    return (
        <CustomBottomSheetModal
            index={1}
            ref={props.sheetRef}
            snapPoints={snapPoints}
            style={shadowStyle}
            sheetHidden={props.isBottomSheetHidden}
            onChange={onSheetChangePosition}
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
                    data={exercises}
                    extraData={exercises}
                    renderItem={({ item, index }) => (
                        <WorkoutTrackerExercise
                            exercise={item}
                            exerciseIndex={index}
                            allExercises={exercises}
                            setExercises={setExercises}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer size='xl' />}
                    ListFooterComponent={
                        <WorkoutModalFooter exercises={exercises} setExercises={setExercises} />
                    }
                    contentContainerStyle={{ padding: 16 }}
                />
            </WorkoutModalView>
        </CustomBottomSheetModal>
    );
}

function addExercise(
    exercises: Exercise[],
    setExercises: Dispatch<SetStateAction<Exercise[]>>
): void {
    setExercises((prevExercises) => [
        ...prevExercises,
        {
            name: 'static name',
            sets: [
                {
                    reps: null,
                    weight: null,
                    rpe: null,
                    previous: null,
                },
            ],
        },
    ]);
}

function WorkoutModalFooter({
    exercises,
    setExercises,
}: WorkoutModalFooterProps): React.ReactElement {
    return (
        <View>
            <Spacer size='xxl' />
            <Button
                variant='full'
                backgroundColor='primary'
                textColor='white'
                onPress={() => {
                    addExercise(exercises, setExercises);
                }}
            >
                Add Exercise
            </Button>
            <Spacer size='xxl' />
        </View>
    );
}
