import React, { useState } from 'react';
import { FlatList } from 'react-native';

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
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <Accordion
                            title={item.title}
                            text={item.text}
                            id={index}
                            selectedSection={selectedLevel}
                            setSelectedSection={setSelectedLevel}
                            expandedSection={expandedLevel}
                            setExpandedSection={setExpendedLevel}
                        />
                    )}
                    scrollEnabled={false}
                />
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    disabled={selectedLevel === -1}
                    onPress={() => {
                        // navigation.push();
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
    },
    {
        title: 'Beginner',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendislaudantium tempore molestias eaque excepturi quis deserunt illo iusto voluptatibus doloribus facere enim provident. Perferendis tempora, ratione vero obcaecati repellendus eos.',
    },
    {
        title: 'Intermediate',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendislaudantium tempore molestias eaque excepturi quis deserunt illo iusto voluptatibus doloribus facere enim provident. Perferendis tempora, ratione vero obcaecati repellendus eos.',
    },
    {
        title: 'Expert',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendislaudantium tempore molestias eaque excepturi quis deserunt illo iusto voluptatibus doloribus facere enim provident. Perferendis tempora, ratione vero obcaecati repellendus eos.',
    },
];
