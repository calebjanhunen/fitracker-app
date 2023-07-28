import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { styled } from 'styled-components';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';

interface Props {
    title: string;
    text: string;
}

const AccordionHeaderContainer = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const AccordionTitle = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.xxs};
`;

export default function Accordion({ title, text }: Props): React.ReactElement {
    const [toggleShowText, setToggleShowText] = useState<boolean>(false);

    return (
        <View>
            <AccordionHeaderContainer
                onPress={() => {
                    setToggleShowText(!toggleShowText);
                }}
            >
                <AccordionTitle>
                    <Ionicons name='ellipse-outline' size={22} />
                    <Text variant='headline'>{title}</Text>
                </AccordionTitle>
                <Ionicons
                    name={toggleShowText ? 'chevron-down-outline' : 'chevron-forward-outline'}
                    size={26}
                />
            </AccordionHeaderContainer>
            {toggleShowText && (
                <View>
                    <Spacer size='xxs' />
                    <Text variant='body'>{text}</Text>
                </View>
            )}
        </View>
    );
}
