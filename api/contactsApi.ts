import { supabase } from '@/api/supabase';
import { Contact } from '@/types/Contact';


const contactsApi = {
    addContact: async (contact: Contact): Promise<Contact | null> => {
        try {
            const { data, error } = await supabase
                .from('contacts')
                .insert(contact)
                .single();

            if (error) {
                throw new Error(`Error adding contact: ${error.message}`);
            }

            return data;
        } catch (error) {
            console.error('Error adding contact:', error);
            return null;
        }
    },
    
    fetchContactsByOrganization: async (
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

            // @ts-ignore
            return data?.map((item) => item.contacts) || [];
        } catch (error) {
            console.error('Error fetching contacts by organization:', error);
            return [];
        }
    },

    deleteContact: async (contactId: number): Promise<boolean> => {
        try {
            await deleteOrganizationContact(contactId);

            const { error } = await supabase
                .from('contacts')
                .delete()
                .eq('id', contactId);

            if (error) {
                throw new Error(`Error deleting contact: ${error.message}`);
            }

            return true;
        } catch (error) {
            console.error('Error deleting contact:', error);
            return false;
        }
    }
}


const deleteOrganizationContact = async (contactId: number): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('organizations_contacts')
            .delete()
            .eq('contact_id', contactId);

        if (error) {
            throw new Error(`Error deleting contact: ${error.message}`);
        }

        return true;
    } catch (error) {
        console.error('Error deleting contact:', error);
        return false;
    }
};

export default contactsApi;