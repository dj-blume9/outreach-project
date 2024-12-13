import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Contact} from "@/types/Contact";
import {User} from "@/types/User";
import ContactList from "@/app/components/ContactList";
import {getNewContacts, getUnassignedContacts} from "@/lib/contactsHelper";

interface DashboardProps {
    user: User;
    contacts: Contact[];
    updateApp: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({user, contacts, updateApp}) => {
    const [unassignedContacts, setUnassignedContacts] = useState<Contact[]>([]);
    const [newContacts, setNewContacts] = useState<Contact[]>([]);
    const [myContacts, setMyContacts] = useState<Contact[]>([]);
    
    
    useEffect(() => {
        setUnassignedContacts(getUnassignedContacts(contacts));
        setNewContacts(getNewContacts(contacts));
        setMyContacts(contacts.filter(contact => contact.assigned_user_id === user.id));
    }, []);

    const flatListData = [
        {
            title: 'Unassigned Contacts',
            data: unassignedContacts,
        },
        {
            title: 'New Contacts',
            data: newContacts,
        },
        {
            title: 'My Contacts',
            data: contacts,
        }
    ];
    
    if(user.role_id == 1)
    {
        return (
            <View style={styles.container}>
                <FlatList
                    data={flatListData}
                    renderItem={
                        ({item}) => (
                            <View>
                                <Text style={styles.header}>
                                    {item.title}
                                </Text>
                                <ContactList contacts={item.data} updateApp={updateApp}/>
                            </View>
                        )
                    }
                />
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