import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import {Contact} from '@/types/Contact';
import ContactCard from "@/app/components/ContactCard";

interface ContactsProps {
    contacts: Contact[];
    updateApp: () => void;
}

const Contacts: React.FC<ContactsProps> = ({ contacts, updateApp}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Contacts</Text>
            {contacts.length === 0 ? (
                <Text style={styles.noContactsText}>No contacts found for this organization.</Text>
            ) : (
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ContactCard contact={item} adminControls={true} updateApp={updateApp}/>
                    )}
                />
            )}
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
    contactCard: {
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactEmail: {
        fontSize: 14,
        color: '#555',
    },
    contactPhone: {
        fontSize: 14,
        color: '#555',
    },
});

export default Contacts;
