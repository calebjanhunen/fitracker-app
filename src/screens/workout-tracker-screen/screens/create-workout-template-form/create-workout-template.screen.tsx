/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect, useState } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';
import { Button, Input } from '@ui-kitten/components';
import { ActivityIndicator, Alert, View } from 'react-native';
import DraggableFlatList, {
    type DragEndParams,
    type RenderItemParams,
} from 'react-native-draggable-flatlist';

import { Spacer } from 'src/components';
import { useCreateWorkoutTemplateForm } from 'src/hooks/useCreateWorkoutTemplateForm';
import { useKeyboard } from 'src/hooks/useKeyboard';
import type { ICreateWorkoutTemplateExercise } from 'src/interfaces';
import { type WorkoutTrackerStackParamList } from 'src/navigation/workout-tracker-navigation';
import AddExerciseModal from '../../components/add-exercise-modal/add-exercise-modal';
import WorkoutTemplateExercise from './components/workout-template-exercise';
import { useCreateWorkoutTemplate } from 'src/hooks/api/workout-templates/useCreateWorkoutTemplate';

type Props = StackScreenProps<WorkoutTrackerStackParamList, 'CreateWorkoutTemplate'>;

export default function CreateWorkoutTemplate({ navigation }: Props): React.ReactElement {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const {
        workoutTemplate,
        updateWorkoutTemplateName,
        addExercises,
        deleteExercise,
        addSet,
        deleteSet,
        clearWorkoutTemplate,
        reorderExercises,
    } = useCreateWorkoutTemplateForm();
    const {isSaving, createWorkoutTemplate} = useCreateWorkoutTemplate();

    // Add button for saving workout template to header
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingRight: 16,
                    }}
                >
                    <Button
                        size='small'
                        status='success'
                        onPress={() => handleFinishWorkout()}
                        disabled={isSaving}
                    >
                        {isSaving ? <ActivityIndicator /> : 'Save Template'}
                    </Button>
                </View>
            ),
        });
    }, [navigation, workoutTemplate, isSaving]);

    // Add listener to back button in header
    useEffect(() => {
        const beforeRemoveListener = navigation.addListener('beforeRemove', e => {
            if (isSaving) return;
            e.preventDefault();

            Alert.alert(
                'Are you sure you want to go back?',
                'This will clear the workout template and any progress will be lost.',
                [
                    {text: 'No', style: 'cancel', onPress: () => {}},
                    {text: 'Yes', style: 'destructive', onPress: () => {
                        clearWorkoutTemplate();
                        navigation.dispatch(e.data.action)
                    }},
                ]
            )
        })
        return beforeRemoveListener;
    }, [navigation, isSaving])

    const { keyboardHeight } = useKeyboard();

    const renderExercise = ({
        item,
        drag,
        isActive,
    }: RenderItemParams<ICreateWorkoutTemplateExercise>): React.ReactElement => (
        <WorkoutTemplateExercise
            exercise={item}
            deleteExercise={deleteExercise}
            addSet={addSet}
            deleteSet={deleteSet}
            drag={drag}
            isActive={isActive}
        />
    );
    const renderListFooter = (): React.ReactElement => (
        <View>
            <Spacer size='spacing-8' />
            <Button size='small' onPress={() => setModalVisible(true)}>
                Add Exercise
            </Button>
            <Spacer size='spacing-3' />
            <Spacer size='spacing-3' />
            <View style={{ height: keyboardHeight }} />
            <Spacer size='spacing-8' />
            <Spacer size='spacing-8' />
        </View>
    );

    function handleFinishWorkout(): void {
        createWorkoutTemplate(workoutTemplate);
    }

    function handleDragEnd({ data }: DragEndParams<ICreateWorkoutTemplateExercise>): void {
        reorderExercises(data);
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <AddExerciseModal
                visible={modalVisible}
                setVisible={setModalVisible}
                addExercises={addExercises}
                exercisesInWorkout={workoutTemplate.exercises}
            />
            <View style={{ paddingHorizontal: 16 }}>
                <Input
                    placeholder='Enter Workout Name'
                    onChangeText={updateWorkoutTemplateName}
                    value={workoutTemplate.name}
                />
            </View>
            <Spacer size='spacing-4' />
            <DraggableFlatList
                style={{ backgroundColor: 'transparent', paddingHorizontal: 16 }}
                data={workoutTemplate.exercises}
                renderItem={renderExercise}
                keyExtractor={(item) => item.id}
                ListFooterComponent={renderListFooter}
                onDragEnd={handleDragEnd}
            />
        </View>
    );
}
