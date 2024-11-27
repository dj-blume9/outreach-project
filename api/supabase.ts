import {AppState} from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://pvckadfvhxoudafoniel.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Y2thZGZ2aHhvdWRhZm9uaWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2MzUxMzIsImV4cCI6MjA0NzIxMTEzMn0.uYinaeY_17gv_RBZ8oixP5huD224cyEOKWkqbmlY2Kg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

// Tells Supabase Auth to continuously refresh the session automatically
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh().then(r => console.log(r));
    } else {
        supabase.auth.stopAutoRefresh().then(r => console.log(r));
    }
});

