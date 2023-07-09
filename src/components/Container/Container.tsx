import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
    width?: string;
}

const ContainerView = styled(View)<{ width: Props['width'] }>`
    padding: ${(props) => props.theme.spacing.md};
    border: 1px solid ${(props) => props.theme.colors.black};
    border-radius: ${(props) => props.theme.borderRadius};
    ${(props) => (props.width ? `width: ${props.width};` : '')}
`;

export default function Container(props: Props): React.ReactElement {
    return <ContainerView width={props.width}>{props.children}</ContainerView>;
}
