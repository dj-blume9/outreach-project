import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import {Contact} from "@/types/Contact";
import ContactCard from "@/app/components/ContactCard";
import {User} from "@/types/User";
import ContactList from "@/app/components/ContactList";

interface DashboardProps {
    user: User;
    contacts: Contact[];
    onRefresh: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({user, contacts, onRefresh}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [unassignedContacts, setUnassignedContacts] = useState<Contact[]>([]);
    const [newContacts, setNewContacts] = useState<Contact[]>([]);

    const getUnassignedContacts =  () => {
        try {
            if(user.id) {
                let filteredContacts = contacts.filter(contact => contact.assigned_user_id === null);
                setUnassignedContacts(filteredContacts);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const getNewContacts =  () => {
        try {
            if(user.id) {
                const currentDate = new Date();
                const twoDaysAgo = new Date(currentDate.getTime() - 48 * 60 * 60 * 1000);
                let filteredContacts = contacts.filter(contact => {
                    const contactDate = new Date(contact.created_at);
                    return contactDate >= twoDaysAgo && contactDate <= currentDate;
                });
                
                setNewContacts(filteredContacts);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        getUnassignedContacts();
        getNewContacts();
    }, []);
    
    if(user.role_id == 1)
    {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Unassigned Contacts
                </Text>
                <ContactList contacts={unassignedContacts} onRefresh={onRefresh} />
                <Text style={styles.header}>
                    New Contacts
                </Text>
                <ContactList contacts={newContacts} onRefresh={onRefresh} />
            </View>
        );
    }
    else if(user.role_id == 0)
    {
        return (
            <View>
                <Text>
                    User Role:
                </Text>
            </View>
        );
    }
    return (
        <View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    noContactsText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
});


export default Dashboard;