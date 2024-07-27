/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { useEffect, useState } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';
import { Button, Input } from '@ui-kitten/components';
import { View } from 'react-native';
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
                        // disabled={isSaving}
                    >
                        {/* {isSaving ? <ActivityIndicator /> : 'Finish Workout'} */}
                        Save Workout Template
                    </Button>
                </View>
            ),
        });
    }, [navigation, workoutTemplate /* add isSaving from useCreateWOrkoutTEmplate */]);

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
            <Button status='danger' size='small' onPress={handleCancelWorkout}>
                Cancel Workout
            </Button>
            <Spacer size='spacing-3' />
            <View style={{ height: keyboardHeight }} />
            <Spacer size='spacing-8' />
            <Spacer size='spacing-8' />
        </View>
    );

    function handleCancelWorkout(): void {
        clearWorkoutTemplate();
        navigation.goBack();
    }

    function handleFinishWorkout(): void {
        // createWorkout(workout);
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
