import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { IErrorResponse } from 'src/api/client';
import { ExerciseResponseDto } from 'src/api/generated';
import { SizableText, View } from 'tamagui';
import ExerciseListItem from './ExerciseListItem';
import ExerciseSkeleton from './ExerciseSkeleton';

interface Props {
    isLoading: boolean;
    error: IErrorResponse | null;
    exercises: ExerciseResponseDto[] | undefined;
}

export default function ExerciseList({ isLoading, error, exercises }: Props) {
    if (isLoading) {
        return (
            <FlatList
                data={Array.from({ length: 15 })}
                keyExtractor={(_, index) => index.toString()}
                renderItem={() => (
                    <View style={{ marginBottom: 15 }}>
                        <ExerciseSkeleton />
                    </View>
                )}
            />
        );
    }

    if (error ?? !exercises) {
        if (error) {
            return (
                <View alignItems='center'>
                    <SizableText textAlign='center' color='$red10' fontWeight='bold'>
                        Error getting exercises ({error.statusCode}): {error.message}
                    </SizableText>
                </View>
            );
        }

        return (
            <View alignItems='center'>
                <SizableText textAlign='center' color='$red10' fontWeight='bold'>
                    Unexpected error occured while getting exercises. Please try again later.
                </SizableText>
            </View>
        );
    }

    return (
        <FlatList
            keyboardShouldPersistTaps='handled'
            initialNumToRender={10}
            showsVerticalScrollIndicator={false}
            data={exercises}
            renderItem={({ item, index }) => <ExerciseListItem exercise={item} index={index} />}
        />
    );
}
