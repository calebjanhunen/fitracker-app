import React from 'react';

import { Button, Spacer, Text, TextInput } from '../../../../components';

import { FlatList, TouchableOpacity } from 'react-native';
import { ExerciseContainer, FlexView, Icon, Row } from './WorkoutTrackerExerciseStyles';

export default function WorkoutTrackerExercise(): React.ReactElement {
    return (
        <ExerciseContainer>
            <Row>
                <Text variant='headline' color='onWhite'>
                    Barbell Bench Press
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        // TODO: Open modal (idk what will be displayed)
                    }}
                >
                    <Icon name='ellipsis-horizontal' size={34} />
                </TouchableOpacity>
            </Row>
            <Spacer size='xs' />
            <FlatList
                data={[0, 1, 2, 3]}
                ListHeaderComponent={ExerciseSetHeader}
                renderItem={ExerciseSet}
                ItemSeparatorComponent={() => <Spacer size='xxs' />}
            />
            <Spacer size='xs' />
            <Button
                variant='full'
                backgroundColor='white'
                textColor='light'
                borderColor='primary'
                thin
                onPress={() => {
                    // TODO: ADD set
                }}
            >
                Add Set
            </Button>
        </ExerciseContainer>
    );
}

function ExerciseSetHeader(): React.ReactElement {
    return (
        <Row>
            <FlexView flex={0.5}>
                <Text variant='headline' color='primary'>
                    Set
                </Text>
            </FlexView>
            <FlexView flex={2}>
                <Text variant='headline' color='primary'>
                    Previous
                </Text>
            </FlexView>
            <FlexView flex={1}>
                <Text variant='headline' color='primary'>
                    lbs
                </Text>
            </FlexView>
            <FlexView flex={1}>
                <Text variant='headline' color='primary'>
                    Reps
                </Text>
            </FlexView>
        </Row>
    );
}

function ExerciseSet(): React.ReactElement {
    return (
        <Row>
            <FlexView flex={0.5}>
                <Text variant='body' color='primary'>
                    1
                </Text>
            </FlexView>
            <FlexView flex={2}>
                <Text variant='body' color='light'>
                    140 3 X 10 (10)
                </Text>
            </FlexView>
            <FlexView flex={1}>
                <TextInput variant='body' inputMode='numeric' textAlign='center' maxLength={4} />
            </FlexView>
            <FlexView flex={1}>
                <TextInput variant='body' inputMode='numeric' textAlign='center' maxLength={4} />
            </FlexView>
        </Row>
    );
}
