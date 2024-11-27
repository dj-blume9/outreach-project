import {Contact} from "@/types/Contact";


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
            const contactDate = new Date(contact.created_at);
            return contactDate >= twoDaysAgo && contactDate <= currentDate;
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}