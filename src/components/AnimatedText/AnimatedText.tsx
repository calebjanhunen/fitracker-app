import React from 'react';
import { Animated, type LayoutChangeEvent } from 'react-native';

import { styled } from 'styled-components';

interface Props {
    children: React.ReactNode;
    textWidth: React.MutableRefObject<number>;
    animatedValue: Animated.AnimatedInterpolation<number>;
}

const AnimatedTextComponent = styled(Animated.Text)`
    font-size: ${(props) => props.theme.fontSize.body}px;
    font-family: ${(props) => props.theme.fonts.bold};
    color: ${(props) => props.theme.fontColors.white};
`;

export default function AnimatedText(props: Props): React.ReactElement {
    return (
        <AnimatedTextComponent
            onLayout={(event: LayoutChangeEvent) => {
                props.textWidth.current = event.nativeEvent.layout.width;
            }}
            style={{ transform: [{ translateX: props.animatedValue }] }}
        >
            {props.children}
        </AnimatedTextComponent>
    );
}
