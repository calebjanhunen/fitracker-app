import React, { useState } from 'react';
import { IErrorResponse } from 'src/api/client';
import { ExerciseDetailsDto } from 'src/api/generated';
import { SizableText, Spinner, Tabs, View } from 'tamagui';
import ExerciseInfo from './Tabs/ExerciseInfo';
import ExerciseWorkoutHistory from './Tabs/ExerciseWorkoutHistoryList';

interface Props {
    isLoading: boolean;
    error: IErrorResponse | null;
    exerciseDetails: ExerciseDetailsDto | undefined;
}

const INFO_TAB_NAME = 'info';
const HISTORY_TAB_NAME = 'workoutHistory';

export default function ExerciseDetailsModalBody({ isLoading, error, exerciseDetails }: Props) {
    const [selectedTab, setSelectedTab] = useState(INFO_TAB_NAME);

    if (isLoading) {
        return (
            <View flex={1} alignItems='center' justifyContent='center'>
                <Spinner />
            </View>
        );
    }

    if (error ?? !exerciseDetails) {
        return (
            <View alignItems='center' paddingTop='$space.4'>
                <SizableText textAlign='center' color='$red10' fontWeight='bold'>
                    {error
                        ? `Error occured (${error.statusCode}): ${error.message}`
                        : 'Unexpected error occured. Please try again later.'}
                </SizableText>
            </View>
        );
    }

    return (
        <View flex={1} paddingTop='$space.3'>
            <Tabs
                orientation='horizontal'
                flexDirection='column'
                value={selectedTab}
                onValueChange={setSelectedTab}
                flex={1}
            >
                <Tabs.List>
                    <Tabs.Tab
                        flex={1}
                        value={INFO_TAB_NAME}
                        backgroundColor={selectedTab === INFO_TAB_NAME ? '$blue8' : '$gray6'}
                    >
                        <SizableText
                            fontFamily='$body'
                            color={selectedTab === INFO_TAB_NAME ? '$gray1' : '$gray12'}
                            fontWeight='bold'
                        >
                            Info
                        </SizableText>
                    </Tabs.Tab>
                    <Tabs.Tab
                        flex={1}
                        value={HISTORY_TAB_NAME}
                        backgroundColor={selectedTab === HISTORY_TAB_NAME ? '$blue8' : '$gray6'}
                    >
                        <SizableText
                            fontFamily='$body'
                            color={selectedTab === HISTORY_TAB_NAME ? '$gray1' : '$gray12'}
                            fontWeight='bold'
                        >
                            Workout History
                        </SizableText>
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Content flex={1} value={INFO_TAB_NAME} paddingTop='$space.3'>
                    <ExerciseInfo
                        equipment={exerciseDetails.equipment}
                        bodyPart={exerciseDetails.bodyPart}
                        exerciseVariations={exerciseDetails.exerciseVariations}
                    />
                </Tabs.Content>
                <Tabs.Content flex={1} value={HISTORY_TAB_NAME} paddingTop='$space.3'>
                    <ExerciseWorkoutHistory workoutHistoryList={exerciseDetails.workoutHistory} />
                </Tabs.Content>
            </Tabs>
        </View>
    );
}
