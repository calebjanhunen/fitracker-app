import {
    ANDROID_EMULATOR_API_URL,
    API_PORT,
    IOS_EMULATOR_API_URL,
    NGROK_URL,
    PHYSICAL_DEVICE_API_URL,
    USE_NGROK,
} from '@env';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export default function getBaseUrl(): string {
    if (USE_NGROK) {
        return NGROK_URL;
    }
    if (Constants.expoConfig?.extra?.ENVIRONMENT === 'development') {
        if (Device.isDevice) {
            // return `${PHYSICAL_DEVICE_API_URL}:${API_PORT}`;
            return `${PHYSICAL_DEVICE_API_URL}`;
        } else {
            return Platform.OS === 'android'
                ? `${ANDROID_EMULATOR_API_URL}:${API_PORT}`
                : `${IOS_EMULATOR_API_URL}:${API_PORT}`;
        }
    }
    return Constants.expoConfig?.extra?.PROD_API_URL;
}
