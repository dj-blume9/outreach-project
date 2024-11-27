import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, RefreshControl} from 'react-native';
import {Contact} from '@/types/Contact';
import ContactCard from "@/app/components/ContactCard";

interface ContactsProps {
    contacts: Contact[];
    onRefresh: () => void;
}

const Contacts: React.FC<ContactsProps> = ({ contacts, onRefresh}) => {

    const [refreshing, setRefreshing] = useState(false);
    
    const swipeToRefresh = () => {
        setRefreshing(true);
        onRefresh();
        setRefreshing(false);
    }

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
                        <ContactCard contact={item} adminControls={true}/>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={swipeToRefresh} />
                    }
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
