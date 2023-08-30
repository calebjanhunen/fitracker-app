import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

import { StyleSheet } from 'react-native';
import { styled } from 'styled-components';
import { theme } from '../../theme/theme';
import Text from '../Text/Text';

export interface MenuOptionProps {
    onSelect: () => void;
    text: string;
    icon: keyof typeof IonIcons.glyphMap;
    iconColor?: keyof typeof theme.colors;
}

interface Props {
    menuOptions: MenuOptionProps[];
    triggerIcon: keyof typeof IonIcons.glyphMap;
}

const CustomMenuOption = styled(MenuOption)`
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
`;

const Icon = styled(IonIcons)<{ iconColor?: MenuOptionProps['iconColor'] }>`
    color: ${({ theme, iconColor }) =>
        iconColor ? theme.colors[iconColor] : theme.colors.primary};
`;

export default function PopupMenu({ menuOptions, triggerIcon }: Props): React.ReactElement {
    return (
        <Menu>
            <MenuTrigger>
                <Icon name={triggerIcon} size={24} />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.menuOptionsStyles}>
                {menuOptions.map((option, index) => (
                    <CustomMenuOption key={index} onSelect={option.onSelect}>
                        <Icon name={option.icon} size={24} iconColor={option.iconColor} />
                        <Text variant='subhead' color='white'>
                            {option.text}
                        </Text>
                    </CustomMenuOption>
                ))}
            </MenuOptions>
        </Menu>
    );
}

const styles = StyleSheet.create({
    menuOptionsStyles: {
        borderRadius: parseInt(theme.borderRadius),
        backgroundColor: '#333333',
        padding: parseInt(theme.spacing.xxs),
    },
});
