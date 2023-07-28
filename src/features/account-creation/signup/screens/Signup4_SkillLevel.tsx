import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { type StackScreenProps } from '@react-navigation/stack';

import { Accordion, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'SkillLevel'>;

export default function SkillLevel({ navigation }: Props): React.ReactElement {
    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Skill Level
            </Text>
            <SignupBody>
                <Accordion
                    title='Beginner'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
                        laudantium tempore molestias eaque, excepturi quis deserunt illo iusto
                        voluptatibus doloribus facere enim provident. Perferendis tempora, ratione
                        vero obcaecati repellendus eos.'
                />
                <Text variant='headline'>Hello</Text>
            </SignupBody>
            <SignupFooter navigation={navigation} />
        </PageView>
    );
}
