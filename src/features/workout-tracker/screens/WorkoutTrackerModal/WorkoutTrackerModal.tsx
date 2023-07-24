import React, { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { Animated, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { Alert, Button, Spacer, Text, TextInput } from '../../../../components';
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
    setWorkoutTrackerActive: (val: boolean) => void;
}

interface WorkoutModalFooterProps {
    exercises: Exercise[];
    setExercises: Dispatch<SetStateAction<Exercise[]>>;
}

interface CancelWorkoutParams {
    setWorkoutName: (val: string) => void;
    setExercises: (val: []) => void;
    setAlertModalVisible: (val: boolean) => void;
    setWorkoutTrackerActive: (val: boolean) => void;
    sheetRef: React.RefObject<BottomSheetModal>;
}

function cancelWorkout(params: CancelWorkoutParams): void {
    params.setWorkoutName('');
    console.log('cancel workout');
    params.setExercises([]);
    params.setAlertModalVisible(false);
    params.setWorkoutTrackerActive(false);
    params.sheetRef.current?.close();
}

export default function WorkoutTrackerModal({
    sheetRef,
    isBottomSheetHidden,
    setIsBottomSheetHidden,
    setWorkoutTrackerActive,
}: Props): React.ReactElement {
    const [workoutName, setWorkoutName] = useState<string>('');
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const snapPoints = ['1%', '92%'];
    const opacityAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;

    const [alertModalVisible, setAlertModalVisible] = useState(false);

    const changeWorkoutName = (text: string): void => {
        setWorkoutName(text);
    };

    function onSheetChangePosition(index: number): void {
        index === 0 ? setIsBottomSheetHidden(true) : setIsBottomSheetHidden(false);
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
            ref={sheetRef}
            snapPoints={snapPoints}
            style={shadowStyle}
            sheetHidden={isBottomSheetHidden}
            onChange={onSheetChangePosition}
        >
            <Alert
                modalVisible={alertModalVisible}
                setModalVisible={setAlertModalVisible}
                title='Cancel Workout'
                desc='Are you sure you want to cancel this workout?'
                ctaBtn={{
                    text: 'Cancel',
                    backgroundColor: 'error',
                    textColor: 'white',
                }}
                ctaFunction={cancelWorkout}
                ctaFunctionArgs={{
                    setWorkoutName,
                    setExercises,
                    setAlertModalVisible,
                    sheetRef,
                    setWorkoutTrackerActive,
                }}
            />
            <WorkoutModalView>
                <PaddedContainer>
                    <Header>
                        <HeaderButton
                            backgroundColor='error'
                            onPress={() => {
                                // TODO: Clear workout states and close modal
                                setAlertModalVisible(true);
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
                    <Spacer size='xs' />
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
            id: exercises.length,
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
