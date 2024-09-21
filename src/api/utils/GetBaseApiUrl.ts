import {
    ANDROID_EMULATOR_API_URL,
    IOS_EMULATOR_API_URL,
    NGROK_URL,
    PHYSICAL_DEVICE_API_URL,
} from '@env';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export default function getBaseUrl(): string {
    if (__DEV__) {
        if (Device.isDevice) {
            return PHYSICAL_DEVICE_API_URL;
        } else {
            return Platform.OS === 'android' ? ANDROID_EMULATOR_API_URL : IOS_EMULATOR_API_URL;
        }
    }
    // TODO: Set production base url
    return '';
}
