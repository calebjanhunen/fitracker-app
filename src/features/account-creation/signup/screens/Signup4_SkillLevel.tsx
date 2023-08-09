import React, { useContext, useState } from 'react';

import { type StackScreenProps } from '@react-navigation/stack';

import { Accordion, Button, PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody } from '../components';
import { SignupDataContext } from '../signup-context/SignupDataContext';
import { SignupActionTypes } from '../signup-context/SignupDataReducer';

type Props = StackScreenProps<RootStackParamList, 'SkillLevel'>;

export default function SkillLevel({ navigation }: Props): React.ReactElement {
    const { dispatchSignupData } = useContext(SignupDataContext);
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
                        dispatchSignupData({
                            type: SignupActionTypes.ADD_SKILL_LEVEL,
                            payload: data[selectedLevel].title,
                        });
                        navigation.push('EnterLocation');
                        setExpendedLevel(-1);
                    }}
                >
                    Next
                </Button>
                <Spacer size='xl' />
            </SignupBody>
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
