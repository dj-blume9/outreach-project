import {Contact} from "@/types/Contact";
import {OrganizationContact} from "@/types/OrganizationContacts";
import contactsApi from "@/api/contactsApi";
import {Organization} from "@/types/Organization";


export const getUnassignedContacts =  (contacts: Contact[]) => {
    try {
        return contacts.filter(contact => contact.assigned_user_id === null);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
};

export const getNewContacts =  (contacts: Contact[]) => {
    try {
        const currentDate = new Date();
        const twoDaysAgo = new Date(currentDate.getTime() - 48 * 60 * 60 * 1000);
        return contacts.filter(contact => {
            if(contact.created_at == null) return;
            const contactDate = new Date(contact.created_at);
            return contactDate >= twoDaysAgo && contactDate <= currentDate;
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}

export const addNewContact =  async (contact: Contact, organization_id: number) => {
    try{
        const newContact = await contactsApi.addContact(contact);

        if(newContact != null)
        {
            const organization_contact: OrganizationContact = {
                organization_id,
                contact_id: newContact.id as number
            };
            organization_contact.contact_id = newContact.id as number;
            let addContacted = await contactsApi.addContactToOrganization(organization_contact);
            console.log("Contact Added: " + addContacted);
        }

    }
    catch (error) {
        console.error('Error adding contact:', error);
    }
}