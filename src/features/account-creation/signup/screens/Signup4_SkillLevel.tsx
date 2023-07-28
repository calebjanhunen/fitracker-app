import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { type StackScreenProps } from '@react-navigation/stack';

import { PageView, Spacer, Text } from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'SkillLevel'>;

export default function SkillLevel({ navigation }: Props): React.ReactElement {
    const [toggleShowText, setToggleShowText] = useState(false);

    return (
        <PageView>
            <Text variant='title' textAlign='center'>
                Select Skill Level
            </Text>
            <SignupBody>
                <View>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                        onPress={() => {
                            setToggleShowText(!toggleShowText);
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                            }}
                        >
                            <Ionicons name='ellipse-outline' size={22} />
                            <Text variant='headline'>Beginner</Text>
                        </View>
                        <Ionicons
                            name={
                                toggleShowText ? 'chevron-down-outline' : 'chevron-forward-outline'
                            }
                            size={26}
                        />
                    </TouchableOpacity>
                    {toggleShowText && (
                        <View>
                            <Spacer size='xxs' />
                            <Text variant='body'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
                                laudantium tempore molestias eaque, excepturi quis deserunt illo
                                iusto voluptatibus doloribus facere enim provident. Perferendis
                                tempora, ratione vero obcaecati repellendus eos.
                            </Text>
                        </View>
                    )}
                </View>
                <Text variant='headline'>Hello</Text>
            </SignupBody>
            <SignupFooter navigation={navigation} />
        </PageView>
    );
}
