import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { styled } from 'styled-components';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';

interface Props {
    id: number;
    title: string;
    text: string;
    selectedSection: number;
    setSelectedSection: Dispatch<SetStateAction<number>>;
    expandedSection: number;
    setExpandedSection: Dispatch<SetStateAction<number>>;
}

const AccordionHeaderContainer = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${(props) => props.theme.spacing.xxs} 0;
`;

const AccordionTitle = styled(View)`
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.xxs};
`;

const Line = styled(View)`
    height: 1px;
    background-color: ${(props) => props.theme.colors.grey};
`;

export default function Accordion({
    title,
    text,
    id,
    selectedSection,
    setSelectedSection,
    expandedSection,
    setExpandedSection,
}: Props): React.ReactElement {
    return (
        <View>
            <AccordionHeaderContainer
                onPress={() => {
                    setExpandedSection((prevExpandedSection) =>
                        prevExpandedSection === id ? -1 : id
                    );
                }}
                activeOpacity={1}
            >
                <AccordionTitle>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedSection(id);
                        }}
                    >
                        <Ionicons
                            name={
                                selectedSection === id
                                    ? 'checkmark-circle-outline'
                                    : 'ellipse-outline'
                            }
                            size={26}
                        />
                    </TouchableOpacity>
                    <Text variant='headline'>{title}</Text>
                </AccordionTitle>
                <Ionicons
                    name={
                        expandedSection === id ? 'chevron-down-outline' : 'chevron-forward-outline'
                    }
                    size={26}
                />
            </AccordionHeaderContainer>
            <Line />
            {expandedSection === id && (
                <View>
                    <Spacer size='xxs' />
                    <Text variant='body'>{text}</Text>
                </View>
            )}
        </View>
    );
}
