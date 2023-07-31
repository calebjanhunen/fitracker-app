import React, { useState } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import { Accordion, Button, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'SkillLevel'>;

export default function SkillLevel({ navigation }: Props): React.ReactElement {
    const [selectedLevel, setSelectedLevel] = useState<number>(-1);
    const [expandedLevel, setExpendedLevel] = useState<number>(-1);

    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Skill Level
            </Text>
            <SignupBody>
                <Accordion
                    data={data}
                    selectedSection={selectedLevel}
                    setSelectedSection={setSelectedLevel}
                    expandedSection={expandedLevel}
                    setExpandedSection={setExpendedLevel}
                />
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    disabled={selectedLevel === -1}
                    onPress={() => {
                        navigation.push('EnterLocation');
                    }}
                >
                    Next
                </Button>
                <Spacer size='xl' />
            </SignupBody>
            <SignupFooter navigation={navigation} />
        </PageView>
    );
}

const data = [
    {
        title: 'New',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendislaudantium tempore molestias eaque excepturi quis deserunt illo iusto voluptatibus doloribus facere enim provident. Perferendis tempora, ratione vero obcaecati repellendus eos.',
        id: 0,
    },
    {
        title: 'Beginner',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendislaudantium tempore molestias eaque excepturi quis deserunt illo iusto voluptatibus doloribus facere enim provident. Perferendis tempora, ratione vero obcaecati repellendus eos.',
        id: 1,
    },
    {
        title: 'Intermediate',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendislaudantium tempore molestias eaque excepturi quis deserunt illo iusto voluptatibus doloribus facere enim provident. Perferendis tempora, ratione vero obcaecati repellendus eos.',
        id: 2,
    },
    {
        title: 'Expert',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendislaudantium tempore molestias eaque excepturi quis deserunt illo iusto voluptatibus doloribus facere enim provident. Perferendis tempora, ratione vero obcaecati repellendus eos.',
        id: 3,
    },
];
