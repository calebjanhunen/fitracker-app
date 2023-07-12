import React from 'react';
import {
    FlatList,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    type ListRenderItem,
} from 'react-native';

import type IonIcons from '@expo/vector-icons/Ionicons';

import { Button, Spacer, Text } from '..';
import { Icon, MenuContainer, MenuItemContainer, MenuItemSeperator } from './BottomMenuStyles';

interface MenuProps {
    moreOptionsVisible: boolean;
    setMoreOptionsVisible: (val: boolean) => void;
    menuItemProps: MenuItemProps[];
}

interface MenuItemProps {
    icon: keyof typeof IonIcons.glyphMap;
    text: string;
}

export default function MoreOptionsMenu({
    moreOptionsVisible,
    setMoreOptionsVisible,
    menuItemProps,
}: MenuProps): React.ReactElement {
    const renderMenuItem: ListRenderItem<MenuItemProps> = ({ item }) => (
        <MenuItem icon={item.icon} text={item.text} />
    );

    const closeMenu = (): void => {
        setMoreOptionsVisible(false);
    };

    return (
        <Modal visible={moreOptionsVisible} animationType='slide' transparent={true}>
            <TouchableOpacity style={{ flex: 1 }} onPress={closeMenu} activeOpacity={100}>
                <TouchableWithoutFeedback>
                    <MenuContainer>
                        <FlatList
                            style={{ backgroundColor: 'white', borderRadius: 16 }}
                            data={menuItemProps}
                            renderItem={renderMenuItem}
                            ItemSeparatorComponent={MenuItemSeperator}
                        />
                        <Spacer size='xs' />
                        <Button
                            variant='full'
                            backgroundColor='white'
                            textColor='onWhite'
                            onPress={closeMenu}
                        >
                            Cancel
                        </Button>
                    </MenuContainer>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}

function MenuItem({ icon, text }: MenuItemProps): React.ReactElement {
    return (
        <MenuItemContainer onPress={() => {}}>
            <Icon name={icon} size={34} />
            <Text variant='smallTitle'>{text}</Text>
        </MenuItemContainer>
    );
}
