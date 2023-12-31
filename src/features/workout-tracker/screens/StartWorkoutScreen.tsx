import React, { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { type StackScreenProps } from '@react-navigation/stack';
import { styled } from 'styled-components';

import { Button, PageView, Spacer, Text } from '../../../components';
import { type WorkoutTemplate } from '../../../interfaces/WorkoutTemplate';
import { mockWorkoutTemplate } from '../../../mock-data/WorkoutTemplatesMock';
import { type RootStackParamList } from '../../../navigation/WorkoutTrackerNavigation';
import ResumeWorkoutButton from '../components/ResumeWorkoutButton';
import WorkoutTemplateCard from '../components/WorkoutTemplateCard';
import WorkoutTemplateModal from '../components/WorkoutTemplateModal/WorkoutTemplateModal';
import WorkoutTrackerModal from './WorkoutTrackerModal/WorkoutTrackerModal';

type Props = StackScreenProps<RootStackParamList, 'StartWorkout'>;

const HeaderView = styled(View)`
    padding-top: ${(props) => props.theme.spacing.xs};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export default function StartWorkoutScreen({ navigation }: Props): React.ReactElement {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<WorkoutTemplate>({
        name: '',
        exercises: [],
    });
    const [workoutTrackerActive, setWorkoutTrackerActive] = useState<boolean>(false);
    const [isBottomSheetHidden, setIsBottomSheetHidden] = useState<boolean>(false);
    const workoutTrackerModalRef = useRef<BottomSheetModal>(null);

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
                    isWorkoutTrackerActive={workoutTrackerActive}
                    setIsWorkoutTrackerActive={setWorkoutTrackerActive}
                    workoutTrackerModalRef={workoutTrackerModalRef}
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
                setWorkoutTrackerActive={setWorkoutTrackerActive}
                navigation={navigation}
            />
        </>
    );
}
