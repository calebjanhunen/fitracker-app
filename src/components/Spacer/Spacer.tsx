import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';

import { type theme } from '../../theme/theme';

interface Props {
    horizontal?: boolean;
    size: keyof typeof theme.spacing;
}

const SpacingComponent = styled(View)<Props>`
    width: ${(props) => (props.horizontal ? props.theme.spacing[props.size] : '0')};
    height: ${(props) => (!props.horizontal ? props.theme.spacing[props.size] : '0')};
`;

export default function Spacer(props: Props): React.ReactElement {
    return <SpacingComponent horizontal={props.horizontal} size={props.size} />;
}
