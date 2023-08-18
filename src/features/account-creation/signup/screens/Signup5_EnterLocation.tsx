import React, { useContext, useEffect, useState } from 'react';
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
import { GymsAPI } from '../../../../services/api/GymsAPI';
import { SignupBody } from '../components';
import { SignupDataContext } from '../signup-context/SignupDataContext';
import { SignupActionTypes } from '../signup-context/SignupDataReducer';

type Props = StackScreenProps<RootStackParamList, 'EnterLocation'>;

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
    const { signupData, dispatchSignupData } = useContext(SignupDataContext);
    const [country, setCountry] = useState<string>(
        signupData.location?.country ? signupData.location.country : ''
    );
    const [city, setCity] = useState<string>(
        signupData.location?.city ? signupData.location.city : ''
    );
    const [province, setProvince] = useState<string>(
        signupData.location?.province ? signupData.location.province : ''
    );

    // Dropdown vars
    const [open, setOpen] = useState<boolean>(false);
    const [selectedGym, setSelectedGym] = useState<string>(
        signupData.location?.gym.toString() || ''
    );
    const [gyms, setGyms] = useState<Array<{ label: string; value: string }>>([]);

    useEffect(() => {
        async function getGyms(): Promise<void> {
            const data = await GymsAPI.getAll();
            data?.forEach((gym) => {
                setGyms((prevGyms) => [...prevGyms, { label: gym.name, value: gym.id.toString() }]);
            });
        }

        void getGyms();
    }, []);

    const isNextBtnDisabled =
        selectedGym.length === 0 ||
        country.length === 0 ||
        city.length === 0 ||
        province.length === 0;

    return (
        <DismissKeyboardContainer>
            <PageView>
                <Text variant='title' textAlign='center'>
                    Enter location
                </Text>
                <SignupBody>
                    <TextInput
                        variant='smallTitle'
                        placeholder='Country'
                        value={country}
                        onChangeText={(text) => {
                            setCountry(text);
                        }}
                    />
                    <Spacer size='xl' />
                    <Row>
                        <RowElement flex={1}>
                            <TextInput
                                variant='smallTitle'
                                placeholder='City'
                                value={city}
                                onChangeText={(text) => {
                                    setCity(text);
                                }}
                            />
                        </RowElement>
                        <RowElement flex={0.5}>
                            <TextInput
                                variant='smallTitle'
                                placeholder='Province'
                                maxLength={2}
                                value={province}
                                onChangeText={(text) => {
                                    setProvince(text);
                                }}
                            />
                        </RowElement>
                    </Row>
                    <Spacer size='xl' />
                    <DropDownPicker
                        open={open}
                        value={selectedGym}
                        items={gyms}
                        setOpen={setOpen}
                        setValue={setSelectedGym}
                        placeholder='Select a Gym'
                    />
                </SignupBody>
                <Button
                    variant='full'
                    backgroundColor='primary'
                    textColor='white'
                    disabled={isNextBtnDisabled}
                    onPress={() => {
                        dispatchSignupData({
                            type: SignupActionTypes.ADD_LOCATION,
                            payload: { country, city, province, gym: parseInt(selectedGym) },
                        });
                        navigation.push('WorkoutDays');
                    }}
                >
                    Next
                </Button>
                <Spacer size='xl' />
            </PageView>
        </DismissKeyboardContainer>
    );
}
