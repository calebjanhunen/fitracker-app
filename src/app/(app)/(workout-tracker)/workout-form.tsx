import React from 'react';
import { FlatList } from 'react-native';
import KeyboardAvoidingView from 'src/components/common/keyboard-avoiding-view';
import WorkoutFormExercise from 'src/components/workout-tracker/workout-form-exercise';
import { Input, View } from 'tamagui';

export default function WorkoutForm() {
    return (
        <View flex={1} backgroundColor='$background' paddingHorizontal='$5'>
            <KeyboardAvoidingView>
                <FlatList
                    ListHeaderComponent={() => (
                        <Input placeholder='Workout Name' size='$5' marginVertical='$4' />
                    )}
                    data={[0, 0, 0]}
                    renderItem={() => <WorkoutFormExercise />}
                />
            </KeyboardAvoidingView>
        </View>
    );
}
