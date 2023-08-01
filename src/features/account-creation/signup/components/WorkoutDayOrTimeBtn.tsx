import React, { type Dispatch, type SetStateAction } from 'react';
import { TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { styled } from 'styled-components';

import { Text } from '../../../../components';

interface Props {
    id: number;
    text: string;
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
`;

const Icon = styled(Ionicons)<{ isSelected: boolean }>`
    position: absolute;
    left: ${(props) => props.theme.spacing.xl};
    top: 65%;
    color: ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.black)};
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
            <Text variant='button' textAlign='center' color={isSelected ? 'white' : 'primary'}>
                {text}
            </Text>
        </WorkoutDayButtonComponent>
    );
}
