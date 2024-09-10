import React from 'react';
import { FlatList } from 'react-native';
import { Button, H3, SizableText, View, XStack } from 'tamagui';
import WorkoutFormSet from './workout-form-set';

export default function WorkoutFormExercise() {
    return (
        <View>
            <H3 color='$blue11'>Exercise Name</H3>
            <XStack>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={1}>
                    Set
                </SizableText>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={2}>
                    Previous Set
                </SizableText>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={1}>
                    Weight
                </SizableText>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={1}>
                    Reps
                </SizableText>
                <SizableText textAlign='center' size='$5' fontWeight='bold' flex={0.7}>
                    RPE
                </SizableText>
            </XStack>
            <FlatList
                data={[0, 0, 0]}
                scrollEnabled={false}
                renderItem={() => <WorkoutFormSet />}
                ItemSeparatorComponent={() => <View height='$1' />}
            />
            <Button size='$2' marginTop='$3' backgroundColor='$blue5' borderColor='$gray7'>
                Add Set
            </Button>
        </View>
    );
}
