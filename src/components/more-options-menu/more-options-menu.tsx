import React from 'react';

import IonIcons from '@expo/vector-icons/Ionicons';
import { Text, useTheme } from '@ui-kitten/components';
import { View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

export interface MoreOptionsMenuItem {
    onSelect: () => void;
    text: string;
    icon: keyof typeof IonIcons.glyphMap;
    iconColor: 'color-danger-500' | 'color-primary-500';
}
interface Props {
    menuItems: MoreOptionsMenuItem[];
    overModal?: boolean;
}

export default function MoreOptionsMenu({ menuItems, overModal }: Props): React.ReactElement {
    const theme = useTheme();
    const menuOptions = menuItems.map((menuItem, i) => (
        <MenuOption
            key={i}
            onSelect={menuItem.onSelect}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
            }}
        >
            <IonIcons size={20} color={theme[menuItem.iconColor]} name={menuItem.icon} />
            <Text appearance='alternative' category='label' style={{ fontSize: 18 }}>
                {menuItem.text}
            </Text>
        </MenuOption>
    ));

    return (
        <Menu>
            <MenuTrigger>
                <View
                    style={{
                        backgroundColor: theme['color-primary-transparent-400'],
                        paddingVertical: 2,
                        paddingHorizontal: 6,
                        borderRadius: 5,
                    }}
                >
                    <IonIcons
                        size={18}
                        color={theme['color-primary-400']}
                        name='ellipsis-horizontal'
                    />
                </View>
            </MenuTrigger>
            <MenuOptions>
                <View
                    style={{
                        backgroundColor: theme['color-basic-700'],
                        borderRadius: 5,
                        paddingHorizontal: 8,
                        flexDirection: 'column',
                        gap: 4,
                        position: overModal ? 'absolute' : 'relative',
                        top: overModal ? -100 : 0,
                    }}
                >
                    {menuOptions}
                </View>
            </MenuOptions>
        </Menu>
    );
}
