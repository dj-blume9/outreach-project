import {AppState} from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import {Contact} from '@/types/Contact';
import {UUID} from "node:crypto";
import {number} from "prop-types";

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

export const fetchOrganizationIdsByUserId = async (userId: UUID): Promise<number[]> => {
    try {
        const { data, error } = await supabase
            .from('users_organizations')
            .select('organization_id')
            .eq('user_id', userId);

        if (error) {
            throw new Error(`Error fetching organization IDs: ${error.message}`);
        }

        if (!data || data.length === 0) {
            console.log('No organizations found for this user.');
            return [];
        }

        // Extract organization IDs as a number array
        const organizationIds = data.map((row) => Number(row.organization_id));
        return organizationIds;
    } catch (error) {
        console.error('Error fetching organization IDs:', error);
        return [];
    }
};

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
        // @ts-ignore
        return data?.map((item) => item.contacts) || [];
    } catch (error) {
        console.error('Error fetching contacts by organization:', error);
        return [];
    }
};

// Tells Supabase Auth to continuously refresh the session automatically
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh().then(r => console.log(r));
    } else {
        supabase.auth.stopAutoRefresh().then(r => console.log(r));
    }
});

