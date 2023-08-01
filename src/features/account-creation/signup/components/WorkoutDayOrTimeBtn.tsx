import React, { type Dispatch, type SetStateAction } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { styled } from 'styled-components';

import { Text } from '../../../../components';

interface Props {
    id: number;
    text: string;
    subText?: string;
    selectedIds: number[];
    setSelectedIds: Dispatch<SetStateAction<number[]>>;
}

const WorkoutDayButtonComponent = styled(TouchableOpacity)<{ isSelected: boolean }>`
    border: 1px solid
        ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.black)};
    border-radius: 50px;
    padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
    background-color: ${({ isSelected, theme }) =>
        isSelected ? theme.colors.secondary : theme.colors.white};
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
`;

const Icon = styled(Ionicons)<{ isSelected: boolean }>`
    color: ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.black)};
`;

const TextContainer = styled(View)`
    gap: ${(props) => props.theme.spacing.xxxs};
`;

function toggleSelectedBtn(
    id: number,
    selectedIds: number[],
    setSelectedIds: Dispatch<SetStateAction<number[]>>
): void {
    if (selectedIds.includes(id)) {
        setSelectedIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
    } else {
        setSelectedIds([...selectedIds, id]);
    }
}

export default function WorkoutDayOrTimeBtn({
    id,
    text,
    subText,
    selectedIds,
    setSelectedIds,
}: Props): React.ReactElement {
    const isSelected: boolean = selectedIds.includes(id);

    return (
        <WorkoutDayButtonComponent
            onPress={() => {
                toggleSelectedBtn(id, selectedIds, setSelectedIds);
            }}
            // activeOpacity={1}
            isSelected={isSelected}
        >
            <Icon
                name={isSelected ? 'checkmark-circle-outline' : 'ellipse-outline'}
                size={24}
                isSelected={isSelected}
            />
            <TextContainer>
                <Text variant='button' color={isSelected ? 'white' : 'primary'}>
                    {text}
                </Text>
                {subText && (
                    <Text variant='subhead' color={isSelected ? 'white' : 'light'}>
                        {subText}
                    </Text>
                )}
            </TextContainer>
        </WorkoutDayButtonComponent>
    );
}
