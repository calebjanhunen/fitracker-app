import React, { useReducer, useRef, useState } from 'react';
import {
    Animated,
    TouchableOpacity,
    View,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
} from 'react-native';

import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import DraggableFlatList, { type RenderItemParams } from 'react-native-draggable-flatlist';

import { type StackNavigationProp } from '@react-navigation/stack';
import { Alert, Button, PopupMenu, Spacer, Text } from '../../../../components';
import { type MenuOptionProps } from '../../../../components/PopupMenu/PopupMenu';
import useSaveWorkout from '../../../../hooks/workouts/useSaveWorkout';
import { type AlertModalVars } from '../../../../interfaces/AlertModal';
import { type Exercise } from '../../../../interfaces/Exercise';
import { type RootStackParamList } from '../../../../navigation/WorkoutTrackerNavigation';
import AddExerciseModal from '../../components/AddExerciseModal/AddExerciseModal';
import WorkoutTrackerExercise from '../../components/WorkoutTrackerExercise/WorkoutTrackerExercise';
import { ExercisesActionsTypes, exercisesReducer } from '../../reducers/ExercisesReducer';
import {
    CustomBottomSheetModal,
    Header,
    HeaderButton,
    Icon,
    Line,
    PaddedContainer,
    Row,
    WorkoutModalView,
    WorkoutNameInput,
    shadowStyle,
} from './WorkoutTrackerModalStyles';

interface Props {
    sheetRef: React.RefObject<BottomSheetModal>;
    isBottomSheetHidden: boolean;
    setIsBottomSheetHidden: (val: boolean) => void;
    setWorkoutTrackerActive: (val: boolean) => void;
    navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
}

export default function WorkoutTrackerModal({
    sheetRef,
    isBottomSheetHidden,
    setIsBottomSheetHidden,
    setWorkoutTrackerActive,
    navigation,
}: Props): React.ReactElement {
    const snapPoints = ['1%', '99%'];
    const opacityAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;
    const [workoutName, setWorkoutName] = useState<string>('');
    const [alertModalVars, setAlertModalVars] = useState<AlertModalVars>();
    const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
    const [addExerciseModalVisible, setAddExerciseModalVisible] = useState<boolean>(false);
    const [workoutExercises, dispatchExercises] = useReducer(exercisesReducer, []);
    const [reorderExercises, setReorderExercises] = useState<boolean>(false);
    const { initSaveWorkout, isError } = useSaveWorkout();
    const menuOptions: MenuOptionProps[] = [
        {
            text: 'Reorder Exercises',
            icon: 'reorder-four',
            onSelect: () => {
                setReorderExercises(true);
            },
        },
    ];

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

    function deleteAllExercises(): void {
        dispatchExercises({ type: ExercisesActionsTypes.DELETE_ALL_EXERCISES });
    }

    function renderExercise({
        item,
        drag,
        isActive,
    }: RenderItemParams<Exercise>): React.ReactElement {
        return (
            <WorkoutTrackerExercise
                exercise={item}
                dispatchExercises={dispatchExercises}
                drag={drag}
                reorderExercises={reorderExercises}
                isActive={isActive}
            />
        );
    }

    function openAlertWindow(alertType: 'cancel' | 'finish'): void {
        if (alertType === 'finish') {
            setAlertModalVars({
                title: 'Finish Workout',
                desc: 'All invalid or empty sets and exercises will be removed.',
                ctaBtn: {
                    text: 'Finish',
                    backgroundColor: 'success',
                    textColor: 'white',
                },
                ctaFunction: finishWorkout,
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
                ctaFunction: closeWorkoutTrackerModal,
            });
        }

        setAlertModalVisible(true);
    }

    function closeWorkoutTrackerModal(): void {
        setWorkoutName('');
        setAlertModalVisible(false);
        setWorkoutTrackerActive(false);
        deleteAllExercises();
        sheetRef.current?.close();
        navigation.navigate('WorkoutTrackerHome');
    }

    function finishWorkout(): void {
        void saveWorkout();
    }

    async function saveWorkout(): Promise<void> {
        await initSaveWorkout({ workoutName, workoutExercises });
        if (!isError) {
            closeWorkoutTrackerModal();
        }
    }

    return (
        <>
            {alertModalVars && (
                <Alert
                    modalVisible={alertModalVisible}
                    setModalVisible={setAlertModalVisible}
                    title={alertModalVars.title}
                    desc={alertModalVars.desc}
                    ctaBtn={alertModalVars.ctaBtn}
                    ctaFunction={alertModalVars.ctaFunction}
                />
            )}
            <AddExerciseModal
                modalVisible={addExerciseModalVisible}
                setModalVisible={setAddExerciseModalVisible}
                workoutExercises={workoutExercises}
                dispatchExercises={dispatchExercises}
            />
            <CustomBottomSheetModal
                index={1}
                ref={sheetRef}
                snapPoints={snapPoints}
                style={shadowStyle}
                sheetHidden={isBottomSheetHidden}
                onChange={onSheetChangePosition}
                enablePanDownToClose={false}
            >
                <WorkoutModalView>
                    <PaddedContainer>
                        <Header>
                            <HeaderButton
                                backgroundColor='error'
                                onPress={() => {
                                    openAlertWindow('cancel');
                                }}
                            >
                                <Text variant='button' color='white'>
                                    Cancel
                                </Text>
                            </HeaderButton>
                            <HeaderButton
                                backgroundColor='success'
                                onPress={() => {
                                    openAlertWindow('finish');
                                }}
                            >
                                <Text variant='button' color='white'>
                                    Finish
                                </Text>
                            </HeaderButton>
                        </Header>
                        <Spacer size='xs' />
                        <Row>
                            <WorkoutNameInput
                                variant='smallTitle'
                                placeholder='Enter Workout Name...'
                                value={workoutName}
                                onChangeText={setWorkoutName}
                            />
                            {reorderExercises ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        setReorderExercises(false);
                                    }}
                                >
                                    <Icon name='checkmark' size={24} />
                                </TouchableOpacity>
                            ) : (
                                <PopupMenu
                                    triggerIcon='ellipsis-vertical'
                                    menuOptions={menuOptions}
                                />
                            )}
                        </Row>
                        <Spacer size='xs' />
                    </PaddedContainer>
                    <Line style={{ opacity: opacityAnimation }} />
                    <DraggableFlatList
                        onScroll={onExerciseListScroll}
                        style={{ flex: 1 }}
                        data={workoutExercises}
                        renderItem={renderExercise}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <Spacer size='xs' />}
                        ListFooterComponent={
                            <WorkoutModalFooter
                                setAddExerciseModalVisible={setAddExerciseModalVisible}
                            />
                        }
                        contentContainerStyle={{ padding: 16 }}
                        containerStyle={{ flex: 1 }}
                        onDragEnd={({ data }) => {
                            dispatchExercises({
                                type: ExercisesActionsTypes.REORDER_EXERCISES,
                                payload: { exercises: data },
                            });
                        }}
                    />
                </WorkoutModalView>
            </CustomBottomSheetModal>
        </>
    );
}

interface WOrkoutModalFooterProps {
    setAddExerciseModalVisible: (val: boolean) => void;
}

function WorkoutModalFooter({
    setAddExerciseModalVisible,
}: WOrkoutModalFooterProps): React.ReactElement {
    return (
        <View>
            <Spacer size='xxl' />
            <Button
                variant='full'
                backgroundColor='primary'
                textColor='white'
                onPress={() => {
                    setAddExerciseModalVisible(true);
                }}
            >
                Add Exercise
            </Button>
            <Spacer size='xxl' />
        </View>
    );
}
