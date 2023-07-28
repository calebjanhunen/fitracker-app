import React, { useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import { styled } from 'styled-components';
import { theme } from '../../theme/theme';
import Text from '../Text/Text';

interface Props {
    text: string;
    onPress: () => void;
    isSelected: boolean;
}

const ChipComponent = styled(TouchableOpacity)`
    border: 1px solid ${(props) => props.theme.colors.black};
    padding: ${(props) => props.theme.spacing.xxxs} ${(props) => props.theme.spacing.xxs};
    margin-bottom: 15px;
    border-radius: 100px;
`;

export const ChipContainer = styled(View)`
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spacing.xs};
    justify-content: center;
`;

const AnimatedChip = Animated.createAnimatedComponent(ChipComponent);

export default function Chip(props: Props): React.ReactElement {
    const chipSelectionAnim = useRef(new Animated.Value(0)).current;

    props.isSelected
        ? Animated.timing(chipSelectionAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
          }).start()
        : Animated.timing(chipSelectionAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
          }).start();

    return (
        <AnimatedChip
            style={{
                backgroundColor: chipSelectionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [theme.colors.white, theme.colors.secondary],
                }),
                borderColor: chipSelectionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [theme.colors.black, theme.colors.white],
                }),
            }}
            activeOpacity={1}
            onPress={props.onPress}
        >
            <Text variant='body' color={props.isSelected ? 'white' : 'primary'}>
                {props.text}
            </Text>
        </AnimatedChip>
    );
}
