import { API_KEY, SERVER_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const apiClient = createClient(SERVER_URL, API_KEY, {
    auth: {
        storage: AsyncStorage,
        persistSession: true,
    },
}); // API_KEY = anon key
