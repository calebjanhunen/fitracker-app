/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import Ionicons from '@expo/vector-icons/Ionicons';
import { type StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, List, Modal, Text, useStyleSheet } from '@ui-kitten/components';
import React, { type Dispatch, type SetStateAction } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Spacer } from 'src/components';
import { useGetWorkoutTemplates } from 'src/hooks/api/workout-templates/useGetworkoutTemplates';
import type { WorkoutTemplate } from 'src/interfaces';
import type { WorkoutTrackerStackParamList } from 'src/navigation/workout-tracker-navigation';
import WorkoutTemplateItem from './workout-template-item';

interface Props {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    selectedWorkoutTemplate: WorkoutTemplate | null;
    setSelectedWorkoutTemplate: Dispatch<SetStateAction<WorkoutTemplate | null>>;
    goToWorkoutTrackerFormScreen: () => void;
    navigation: StackNavigationProp<WorkoutTrackerStackParamList>;
}

export default function SelectWorkoutTemplateModal({
    visible,
    setVisible,
    selectedWorkoutTemplate,
    setSelectedWorkoutTemplate,
    goToWorkoutTrackerFormScreen,
    navigation,
}: Props): React.ReactElement {
    const styles = useStyleSheet(themedStyles);
    const { workoutTemplates, isLoading, error } = useGetWorkoutTemplates();
    const renderItem = ({
        item,
        index,
    }: {
        item: WorkoutTemplate;
        index: number;
    }): React.ReactElement => (
        <WorkoutTemplateItem
            workoutTemplate={item}
            index={index}
            setSelectedWT={setSelectedWorkoutTemplate}
            isSelected={selectedWorkoutTemplate?.id === item.id}
        />
    );

    function handleGoToCreateWorkoutTemplateFormScreen(): void {
        setVisible(false);
        navigation.navigate('CreateWorkoutTemplate');
    }

    return (
        <Modal
            visible={visible}
            onBackdropPress={() => setVisible(false)}
            backdropStyle={styles.backdrop}
            style={{ flex: 1 }}
        >
            <Layout style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setVisible(false)}>
                        <Ionicons size={24} name='close-outline' />
                    </TouchableOpacity>
                    <Text category='h3'>Templates</Text>
                    <TouchableOpacity
                        style={styles.openBtn}
                        onPress={handleGoToCreateWorkoutTemplateFormScreen}
                    >
                        <Ionicons size={24} name='add-outline' color={'white'} />
                    </TouchableOpacity>
                </View>
                <Button
                    size='small'
                    disabled={!selectedWorkoutTemplate}
                    onPress={goToWorkoutTrackerFormScreen}
                >
                    Start Workout
                </Button>
                <Spacer size='spacing-4' />
                {isLoading ? (
                    <ActivityIndicator />
                ) : error ? (
                    <Text>Error getting workout templates</Text>
                ) : workoutTemplates ? (
                    <List
                        style={styles.templateList}
                        data={workoutTemplates}
                        numColumns={2}
                        key={'flatlist-2'} // change this when changing numColumns
                        renderItem={renderItem}
                        ItemSeparatorComponent={() => <Spacer size='spacing-4' />}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <Text>No Workout Templates</Text>
                )}
            </Layout>
        </Modal>
    );
}

const themedStyles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        height: Dimensions.get('window').height - 200,
        width: Dimensions.get('window').width - 32,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        justifyContent: 'space-between',
        // paddingHorizontal: 16,
    },
    templateList: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    closeBtn: {
        backgroundColor: 'color-basic-500',
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 5,
    },
    openBtn: {
        backgroundColor: 'color-primary-500',
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 5,
    },
});
