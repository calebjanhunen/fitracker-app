/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import {
    IndexPath,
    Input,
    Layout,
    Modal,
    Select,
    SelectItem,
    Text,
    useStyleSheet,
    useTheme,
} from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Spacer } from 'src/components';
import { useCreateExercise } from 'src/hooks/api/exercises/useCreateExercise';
import type { ExerciseForWorkout } from 'src/interfaces';

interface Props {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    addExerciseToSelectedExercises: (exercise: ExerciseForWorkout) => void;
    setExercisesDisplay: Dispatch<SetStateAction<ExerciseForWorkout[]>>;
    exerciseSearchText: string;
}

export default function CreateExerciseModal({
    visible,
    setVisible,
    addExerciseToSelectedExercises,
    setExercisesDisplay,
    exerciseSearchText,
}: Props): React.ReactElement {
    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();
    const { createExercise } = useCreateExercise(
        setExercisesDisplay,
        addExerciseToSelectedExercises
    );
    const [name, setName] = useState<string>('');
    const [selectedBodyPart, setSelectedBodyPart] = useState<IndexPath>(new IndexPath(-1));
    const [selectedEquipment, setSelectedEquipment] = useState<IndexPath>(new IndexPath(-1));
    const [saveBtnDisabled, setSaveBtnDisabled] = useState<boolean>(true);
    const bodyParts = ['Biceps', 'Triceps', 'Shoulders', 'Chest', 'Back', 'Core', 'Legs', 'Others'];
    const equipment = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Body'];

    useEffect(() => {
        setSaveBtnDisabled(selectedBodyPart.row === -1 || selectedEquipment.row === -1 || !name);
    }, [name, selectedBodyPart, selectedEquipment]);

    useEffect(() => {
        setName(exerciseSearchText);
    }, [exerciseSearchText]);

    function onModalClose(): void {
        setSelectedBodyPart(new IndexPath(-1));
        setSelectedEquipment(new IndexPath(-1));
        setName('');
        setVisible(false);
    }

    async function onExerciseSave(): Promise<void> {
        createExercise({
            name,
            primaryMuscle: bodyParts[selectedBodyPart.row],
            equipment: equipment[selectedEquipment.row],
        });
        onModalClose();
    }

    return (
        <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onModalClose}>
            <Layout style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeBtn} onPress={onModalClose}>
                        <Ionicons size={20} name='close-outline' />
                    </TouchableOpacity>
                    <Text category='s1' style={styles.title}>
                        Create New Exercise
                    </Text>
                    <TouchableOpacity disabled={saveBtnDisabled} onPress={onExerciseSave}>
                        <Text
                            category='s1'
                            style={{
                                color: saveBtnDisabled
                                    ? theme['color-basic-disabled']
                                    : theme['color-primary-500'],
                                fontWeight: 'bold',
                            }}
                        >
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
                <Spacer size='spacing-3' />
                <Input placeholder='Exercise Name' onChangeText={setName} value={name || ''} />
                <Spacer size='spacing-8' />
                <Select
                    placeholder='Body Part'
                    value={
                        selectedBodyPart.row !== -1
                            ? bodyParts[selectedBodyPart.row]
                            : 'Select Body Part'
                    }
                    selectedIndex={selectedBodyPart}
                    onSelect={(index: IndexPath) => setSelectedBodyPart(index)}
                >
                    {bodyParts.map((bodyPart, index) => (
                        <SelectItem key={index} title={bodyPart} />
                    ))}
                </Select>
                <Spacer size='spacing-3' />
                <Select
                    placeholder='Equipment'
                    value={
                        selectedEquipment.row !== -1
                            ? equipment[selectedEquipment.row]
                            : 'Select Equipment'
                    }
                    selectedIndex={selectedEquipment}
                    onSelect={(index: IndexPath) => setSelectedEquipment(index)}
                >
                    {equipment.map((e, index) => (
                        <SelectItem key={index} title={e} />
                    ))}
                </Select>
            </Layout>
        </Modal>
    );
}

const themedStyles = StyleSheet.create({
    container: {
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 60,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontWeight: 'bold',
    },
    closeBtn: {
        backgroundColor: 'color-basic-500',
        paddingHorizontal: 4,
        borderRadius: 5,
    },
});
