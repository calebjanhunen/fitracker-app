/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Layout, List, Modal, Text } from '@ui-kitten/components';
import React, { type Dispatch, type SetStateAction } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Spacer } from 'src/components';
import WorkoutTemplateItem from './workout-template-item';

interface Props {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function SelectWorkoutTemplateModal({
    visible,
    setVisible,
}: Props): React.ReactElement {
    const renderItem = ({ item, index }: { item: number; index: number }): React.ReactElement => (
        <WorkoutTemplateItem index={index} />
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
                <List
                    style={styles.templateList}
                    data={[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12]}
                    numColumns={2}
                    key={'flatlist-2'} // change this when changing numColumns
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <Spacer size='spacing-4' />}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
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
    },
    templateList: {
        flex: 1,
    },
});
