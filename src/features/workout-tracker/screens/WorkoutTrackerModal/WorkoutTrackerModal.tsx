import React, { useReducer, useRef, useState, type Dispatch } from 'react';
import { Animated, View, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import { Alert, Button, Spacer, Text, TextInput } from '../../../../components';
import { type Exercise } from '../../../../interfaces/Exercise';
import { type theme } from '../../../../theme/theme';
import AddExerciseModal from '../../components/AddExerciseModal/AddExerciseModal';
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

interface AlertModalVars {
    title: string;
    desc: string;
    ctaBtn: {
        text: string;
        backgroundColor: keyof typeof theme.colors;
        textColor: keyof typeof theme.fontColors;
    };
    ctaFunction: (params: alertModalCTAFunctionParams) => void;
    ctaFunctionArgs: alertModalCTAFunctionParams;
}

interface alertModalCTAFunctionParams {
    setWorkoutName: (val: string) => void;
    setAlertModalVisible: (val: boolean) => void;
    setWorkoutTrackerActive: (val: boolean) => void;
    sheetRef: React.RefObject<BottomSheetModal>;
    dispatchExercises: Dispatch<ExercisesActions>;
}

function openAlertWindow(
    alertType: 'cancel' | 'finish',
    setAlertModalVisible: (val: boolean) => void,
    setAlertModalVars: (val: AlertModalVars) => void,
    alertModalCTAFunctionVars: alertModalCTAFunctionParams
): void {
    if (alertType === 'finish') {
        setAlertModalVars({
            title: 'Finish Workout',
            desc: 'Are you sure you want to finish this workout?',
            ctaBtn: {
                text: 'Finish',
                backgroundColor: 'success',
                textColor: 'white',
            },
            ctaFunction: finishWorkout,
            ctaFunctionArgs: alertModalCTAFunctionVars,
        });
    } else {
        setAlertModalVars({
            title: 'Cancel Workout',
            desc: 'Are you sure you want to cancel this workout?',
            ctaBtn: {
                text: 'Cancel',
                backgroundColor: 'error',
                textColor: 'white',
            },
            ctaFunction: cancelWorkout,
            ctaFunctionArgs: alertModalCTAFunctionVars,
        });
    }

    setAlertModalVisible(true);
}

function cancelWorkout(params: alertModalCTAFunctionParams): void {
    params.setWorkoutName('');
    params.setAlertModalVisible(false);
    params.setWorkoutTrackerActive(false);
    params.dispatchExercises({ type: 'end-workout' });
    params.sheetRef.current?.close();
}

function finishWorkout(params: alertModalCTAFunctionParams): void {
    // TODO: Send api request to save workout
    // Go to a screen displaying to user that they ended workout?

    params.setWorkoutName('');
    params.setAlertModalVisible(false);
    params.setWorkoutTrackerActive(false);
    params.sheetRef.current?.close();
}

export interface ExercisesActions {
    type: string;
    payload?: string | number[];
}

function exercisesReducer(exercises: Exercise[], action: ExercisesActions): Exercise[] {
    const exerciseId = uuid.v4();
    switch (action.type) {
        case 'add-exercise':
            return [
                ...exercises,
                {
                    name: `Exercise: ${exerciseId.toString().slice(0, 8)}`,
                    id: exerciseId,
                    sets: [],
                },
            ];
        case 'delete-exercise':
            return exercises.filter((exercise) => exercise.id !== action.payload);
        case 'end-workout':
            return [];
        default:
            return exercises;
    }
}

export default function WorkoutTrackerModal({
    sheetRef,
    isBottomSheetHidden,
    setIsBottomSheetHidden,
    setWorkoutTrackerActive,
}: Props): React.ReactElement {
    const snapPoints = ['1%', '92%'];
    const opacityAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;
    const [workoutName, setWorkoutName] = useState<string>('');
    const [addExerciseModalVisible, setAddExerciseModalVisible] = useState<boolean>(false);
    const [alertModalVars, setAlertModalVars] = useState<AlertModalVars>();
    const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

    const changeWorkoutName = (text: string): void => {
        setWorkoutName(text);
    };

    // USEREDUCER EXPERIMENTATION
    const [exercises, dispatchExercises] = useReducer(exercisesReducer, []);

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
            {alertModalVars && (
                <Alert
                    modalVisible={alertModalVisible}
                    setModalVisible={setAlertModalVisible}
                    title={alertModalVars.title}
                    desc={alertModalVars.desc}
                    ctaBtn={alertModalVars.ctaBtn}
                    ctaFunction={alertModalVars.ctaFunction}
                    ctaFunctionArgs={alertModalVars.ctaFunctionArgs}
                />
            )}
            {/* <AddExerciseModal
                modalVisible={addExerciseModalVisible}
                setModalVisible={setAddExerciseModalVisible}
                setExercises={setExercises}
            /> */}
            <WorkoutModalView>
                <PaddedContainer>
                    <Header>
                        <HeaderButton
                            backgroundColor='error'
                            onPress={() => {
                                openAlertWindow('cancel', setAlertModalVisible, setAlertModalVars, {
                                    setWorkoutName,
                                    setAlertModalVisible,
                                    setWorkoutTrackerActive,
                                    sheetRef,
                                    dispatchExercises,
                                });
                            }}
                        >
                            <Text variant='button' color='white'>
                                Cancel
                            </Text>
                        </HeaderButton>
                        <HeaderButton
                            backgroundColor='success'
                            onPress={() => {
                                // openAlertWindow('finish', setAlertModalVisible, setAlertModalVars, {
                                //     setWorkoutName,
                                //     setExercises,
                                //     setAlertModalVisible,
                                //     sheetRef,
                                //     setWorkoutTrackerActive,
                                // });
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
                            dispatchExercises={dispatchExercises}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer size='xl' />}
                    ListFooterComponent={
                        <WorkoutModalFooter
                            setAddExerciseModalVisible={setAddExerciseModalVisible}
                            dispatchExercises={dispatchExercises}
                        />
                    }
                    contentContainerStyle={{ padding: 16 }}
                />
            </WorkoutModalView>
        </CustomBottomSheetModal>
    );
}

interface WOrkoutModalFooterProps {
    setAddExerciseModalVisible: (val: boolean) => void;
    dispatchExercises: (action: ExercisesActions) => void;
}

function WorkoutModalFooter({
    setAddExerciseModalVisible,
    dispatchExercises,
}: WOrkoutModalFooterProps): React.ReactElement {
    return (
        <View>
            <Spacer size='xxl' />
            <Button
                variant='full'
                backgroundColor='primary'
                textColor='white'
                onPress={() => {
                    // setAddExerciseModalVisible(true);
                    dispatchExercises({ type: 'add-exercise' });
                }}
            >
                Add Exercise
            </Button>
            <Spacer size='xxl' />
        </View>
    );
}
