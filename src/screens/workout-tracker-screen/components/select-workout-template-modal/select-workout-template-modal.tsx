/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Layout, List, Modal, Text } from '@ui-kitten/components';
import React, { type Dispatch, type SetStateAction } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Spacer } from 'src/components';
import { useGetWorkoutTemplates } from 'src/hooks/api/workout-templates/useGetworkoutTemplates';
import type { WorkoutTemplate } from 'src/interfaces';
import WorkoutTemplateItem from './workout-template-item';

interface Props {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function SelectWorkoutTemplateModal({
    visible,
    setVisible,
}: Props): React.ReactElement {
    const { workoutTemplates, isLoading, error } = useGetWorkoutTemplates();
    console.log(workoutTemplates);
    const renderItem = ({
        item,
        index,
    }: {
        item: WorkoutTemplate;
        index: number;
    }): React.ReactElement => (
        <WorkoutTemplateItem name={item.name} exercises={item.exercises} index={index} />
    );
    return (
        <Modal
            visible={visible}
            onBackdropPress={() => setVisible(false)}
            backdropStyle={styles.backdrop}
            style={{ flex: 1 }}
        >
            <Layout style={styles.modalContainer}>
                <Text category='h3'>Templates</Text>
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

const styles = StyleSheet.create({
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
    templateList: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});
