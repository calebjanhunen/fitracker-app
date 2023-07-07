import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <AppNavigation />
            <StatusBar style="auto" />
        </View>
    );
}
