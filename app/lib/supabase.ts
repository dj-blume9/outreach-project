import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, PostgrestResponse } from '@supabase/supabase-js';
import Contact from '@/app/types/Contact';

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

/**
 * Fetch contacts by organization ID.
 * @param {number} organizationId - The ID of the organization.
 * @returns {Promise<Contact[]>} - A list of contacts belonging to the organization.
 */
export const fetchContactsByOrganization = async (
    organizationId: number
): Promise<Contact[]> => {
    try {
        const { data, error } = await supabase
            .from('organizations_contacts')
            .select(
                `
        contacts:contact_id (
          id,
          first_name,
          last_name,
          email_address,
          phone_number,
          address,
          custom_fields,
          created_at,
          updated_at,
          assigned_user_id
        )
      `
            )
            .eq('organization_id', organizationId);

        if (error) {
            throw new Error(`Error fetching contacts: ${error.message}`);
        }

        // Extract contacts from the nested response
        const contacts = data?.map((item) => item.contacts) || [];
        // @ts-ignore
        return contacts;
    } catch (error) {
        console.error('Error fetching contacts by organization:', error);
        return [];
    }
};

// Tells Supabase Auth to continuously refresh the session automatically
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});

export default { supabase };
