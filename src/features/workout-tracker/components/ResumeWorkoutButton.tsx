import React, { useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';

import IonIcons from '@expo/vector-icons/Ionicons';
import { Portal } from '@gorhom/portal';
import { styled } from 'styled-components';

import { Text } from '../../../components';

interface Props {
    onPress: () => void;
    isBottomSheetHidden: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ButtonContainer = styled(AnimatedPressable)`
    background-color: ${(props) => props.theme.colors.primary};
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
`;

const TextContainer = styled(View)`
    padding: ${(props) => props.theme.spacing.xxs} ${(props) => props.theme.spacing.md};
    flex-direction: row;
    align-items: center;
    gap: ${(props) => props.theme.spacing.xxxs};
`;

const Icon = styled(IonIcons)`
    color: ${(props) => props.theme.colors.white};
`;

export default function ResumeWorkoutButton(props: Props): React.ReactElement {
    const moveYPosAnim = useRef<Animated.Value>(new Animated.Value(60)).current;

    props.isBottomSheetHidden
        ? Animated.timing(moveYPosAnim, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
          }).start()
        : Animated.timing(moveYPosAnim, {
              toValue: 60,
              duration: 50,
              useNativeDriver: true,
          }).start();

    return (
        <Portal hostName='ResumeWorkoutButtonHost'>
            <ButtonContainer
                onPress={() => {
                    props.onPress();
                }}
                style={{ transform: [{ translateY: moveYPosAnim }] }}
            >
                <TextContainer>
                    <Icon name='chevron-up-outline' size={32} />
                    <Text variant='button' color='white'>
                        Resume Workout
                    </Text>
                </TextContainer>
            </ButtonContainer>
        </Portal>
    );
}
