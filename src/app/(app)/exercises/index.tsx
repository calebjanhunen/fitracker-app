import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetAllExercises, useGetEquipmentAndBodyParts } from 'src/api/hooks';
import DropdownMenu from 'src/components/common/DropdownMenu';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import { ExerciseList } from 'src/components/exercises';
import { useFilteredExercises } from 'src/hooks/common';
import { H3, Input, useTheme, XStack, YStack } from 'tamagui';

export default function ExercisesHome() {
    const { equipment, bodyParts } = useGetEquipmentAndBodyParts();
    const theme = useTheme();
    const [selectedBodyPart, setSelectedBodyParts] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const { data: exercises, isLoading, error } = useGetAllExercises();
    const {
        searchQuery,
        setSearchQuery,
        filteredData: filteredExercises,
    } = useFilteredExercises(
        exercises,
        bodyParts.find((bp) => bp.id === Number(selectedBodyPart))?.name,
        equipment.find((eq) => eq.id === Number(selectedEquipment))?.name
    );

    return (
        <SafeAreaView
            style={{ flex: 1, paddingHorizontal: 16, backgroundColor: theme.background.val }}
            edges={['top']}
        >
            <KeyboardAvoidingView>
                <H3 paddingBottom='$space.3'>Exercises</H3>
                <YStack paddingBottom='$space.5' gap='$space.2'>
                    <Input
                        placeholder='Search for exercise'
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCorrect={false}
                    />
                    <XStack justifyContent='space-between'>
                        <DropdownMenu
                            selectedVal={selectedBodyPart}
                            setSelectedVal={setSelectedBodyParts}
                            options={bodyParts}
                            placeholder='All Body Parts'
                            label='Body Parts'
                            iconAfter={false}
                            width={175}
                            selectedColor='$blue8'
                        />
                        <DropdownMenu
                            selectedVal={selectedEquipment}
                            setSelectedVal={setSelectedEquipment}
                            options={equipment}
                            placeholder='All Equipment'
                            label='Equipment'
                            iconAfter={false}
                            width={175}
                            selectedColor='$blue8'
                        />
                    </XStack>
                </YStack>
                <ExerciseList exercises={filteredExercises} isLoading={isLoading} error={error} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
