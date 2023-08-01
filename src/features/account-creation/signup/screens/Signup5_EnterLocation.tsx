import React, { useState } from 'react';
import { View } from 'react-native';

import { type StackScreenProps } from '@react-navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';
import { styled } from 'styled-components';

import {
    Button,
    DismissKeyboardContainer,
    PageView,
    Spacer,
    Text,
    TextInput,
} from '../../../../components';
import { type RootStackParamList } from '../../../../navigation/AccountNavigation';
import { SignupBody, SignupFooter } from '../components';

type Props = StackScreenProps<RootStackParamList, 'SkillLevel'>;

const Row = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${(props) => props.theme.spacing.xs};
`;

const RowElement = styled(View)<{ flex: number }>`
    flex: ${(props) => props.flex};
`;

export default function EnterLocation({ navigation }: Props): React.ReactElement {
    const [open, setOpen] = useState<boolean>(false);
    const [gymDropdownVal, setGymDropdownVal] = useState<string>('');
    const [gyms, setGyms] = useState([{ label: 'Guelph Gryphons Athletic Centre', value: 'ggac' }]);
    return (
        <DismissKeyboardContainer>
            <PageView>
                <Text variant='title' textAlign='center'>
                    Enter location
                </Text>
                <SignupBody>
                    <TextInput variant='smallTitle' placeholder='Country' />
                    <Spacer size='xl' />
                    <Row>
                        <RowElement flex={1}>
                            <TextInput variant='smallTitle' placeholder='City' />
                        </RowElement>
                        <RowElement flex={0.5}>
                            <TextInput variant='smallTitle' placeholder='Province' maxLength={2} />
                        </RowElement>
                    </Row>
                    <Spacer size='xl' />
                    <DropDownPicker
                        open={open}
                        value={gymDropdownVal}
                        items={gyms}
                        setOpen={setOpen}
                        setValue={setGymDropdownVal}
                        placeholder='Select a Gym'
                    />
                </SignupBody>
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    onPress={() => {
                        // navigation.push('');
                    }}
                >
                    Next
                </Button>
                <Spacer size='xl' />

                <SignupFooter navigation={navigation} />
            </PageView>
        </DismissKeyboardContainer>
    );
}
