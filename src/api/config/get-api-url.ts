import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export function getApiUrl(): string {
    const androidEmulatorApiUrl = Constants.expoConfig?.extra?.androidEmulatorApiUrl;
    const physicalDeviceApiUrl = Constants.expoConfig?.extra?.physicalDeviceApiUrl;
    const iosEmulatorApiUrl = Constants.expoConfig?.extra?.iosEmulatorApiUrl;

    if (__DEV__) {
        if (Device.isDevice) {
            return physicalDeviceApiUrl;
        } else {
            return Platform.OS === 'android' ? androidEmulatorApiUrl : iosEmulatorApiUrl;
        }
    } else {
        // TODO: set production api url
    }
    return '';
}
