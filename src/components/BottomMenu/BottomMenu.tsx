import React from 'react';
import {
    FlatList,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    type ListRenderItem,
} from 'react-native';

import type IonIcons from '@expo/vector-icons/Ionicons';

import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';
import {
    Icon,
    MenuButton,
    MenuContainer,
    MenuItemContainer,
    MenuItemSeperator,
} from './BottomMenuStyles';

interface MenuProps {
    moreOptionsVisible: boolean;
    setMoreOptionsVisible: (val: boolean) => void;
    menuItemProps: MenuItemProps[];
}

interface MenuItemProps {
    icon: keyof typeof IonIcons.glyphMap;
    text: string;
    onPress?: () => void;
}

export default function MoreOptionsMenu({
    moreOptionsVisible,
    setMoreOptionsVisible,
    menuItemProps,
}: MenuProps): React.ReactElement {
    const renderMenuItem: ListRenderItem<MenuItemProps> = ({ item }) => (
        <MenuItem icon={item.icon} text={item.text} onPress={item.onPress} />
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
                            style={{ borderRadius: 16 }}
                            data={menuItemProps}
                            renderItem={renderMenuItem}
                            ItemSeparatorComponent={MenuItemSeperator}
                        />
                        <Spacer size='xs' />
                        <MenuButton onPress={closeMenu}>
                            <Text variant='button' color='onWhite'>
                                Cancel
                            </Text>
                        </MenuButton>
                    </MenuContainer>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}

function MenuItem({ icon, text, onPress }: MenuItemProps): React.ReactElement {
    return (
        <MenuItemContainer onPress={onPress}>
            <Icon name={icon} size={34} />
            <Text variant='smallTitle' color='white'>
                {text}
            </Text>
        </MenuItemContainer>
    );
}
