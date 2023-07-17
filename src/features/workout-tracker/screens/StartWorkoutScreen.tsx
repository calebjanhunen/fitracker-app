import React, { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { styled } from 'styled-components';

import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { Button, PageView, Spacer, Text } from '../../../components';
import { type WorkoutTemplate } from '../../../interfaces/WorkoutTemplate';
import ResumeWorkoutButton from '../components/ResumeWorkoutButton';
import WorkoutTemplateCard from '../components/WorkoutTemplateCard';
import WorkoutTemplateModal from '../components/WorkoutTemplateModal/WorkoutTemplateModal';
import WorkoutTrackerModal from './WorkoutTrackerModal';

const HeaderView = styled(View)`
    padding-top: ${(props) => props.theme.spacing.xs};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export default function StartWorkoutScreen(): React.ReactElement {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<WorkoutTemplate>({ name: '', exercises: [] });

    const workoutTrackerModalRef = useRef<BottomSheetModal>(null);
    const [workoutTrackerActive, setWorkoutTrackerActive] = useState<boolean>(false);
    const [isBottomSheetHidden, setIsBottomSheetHidden] = useState<boolean>(false);

    function onResumePress(): void {
        setIsBottomSheetHidden(!isBottomSheetHidden);
        workoutTrackerModalRef.current?.snapToIndex(1);
    }

    return (
        <>
            <PageView>
                <WorkoutTemplateModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    workoutTemplate={modalData}
                />
                <HeaderView>
                    <Text variant='headline'>TEMPLATES</Text>
                    <Button
                        variant='small'
                        backgroundColor='primary'
                        textColor='white'
                        onPress={() => {
                            // TODO: Link this button to create workout template modal
                        }}
                    >
                        CREATE TEMPLATE
                    </Button>
                </HeaderView>
                <Spacer size='xs' />
                <FlatList
                    style={{ flex: 1 }}
                    data={mockWorkoutTemplate}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <WorkoutTemplateCard
                            template={item}
                            setModalVisible={setModalVisible}
                            setModalData={setModalData}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer size='xs' />}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
                <Spacer size='xxs' />
                {!workoutTrackerActive && (
                    <Button
                        variant='full'
                        backgroundColor='primary'
                        textColor='white'
                        onPress={() => {
                            workoutTrackerModalRef.current?.present();
                            setWorkoutTrackerActive(true);
                        }}
                    >
                        Start Empty Workout
                    </Button>
                )}
                <Spacer size='xxs' />
            </PageView>
            {workoutTrackerActive && (
                <ResumeWorkoutButton
                    onPress={onResumePress}
                    isBottomSheetHidden={isBottomSheetHidden}
                />
            )}
            <WorkoutTrackerModal
                sheetRef={workoutTrackerModalRef}
                isBottomSheetHidden={isBottomSheetHidden}
                setIsBottomSheetHidden={setIsBottomSheetHidden}
            />
        </>
    );
}

const mockWorkoutTemplate: WorkoutTemplate[] = [
    {
        name: 'Push 1',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Lateral Raise (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
    {
        name: 'Push 2',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Incline Bench Press (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Chest Fly (Machine)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Lateral Raise (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Skullcrusher (Dumbbell)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
            {
                name: 'Triceps Extension (Cable)',
                sets: 3,
                reps: 12,
                rpe: 10,
            },
        ],
    },
];
