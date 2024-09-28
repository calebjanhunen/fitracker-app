import {
    ANDROID_EMULATOR_API_URL,
    API_PORT,
    IOS_EMULATOR_API_URL,
    PHYSICAL_DEVICE_API_URL,
} from '@env';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export default function getBaseUrl(): string {
    if (Constants.expoConfig?.extra?.ENVIRONMENT === 'development') {
        if (Device.isDevice) {
            return `${PHYSICAL_DEVICE_API_URL}:${API_PORT}`;
        } else {
            return Platform.OS === 'android'
                ? `${ANDROID_EMULATOR_API_URL}:${API_PORT}`
                : `${IOS_EMULATOR_API_URL}:${API_PORT}`;
        }
    }
    return Constants.expoConfig?.extra?.PROD_API_URL;
}
