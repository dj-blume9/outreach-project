import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import {fetchContactsByOrganization, fetchOrganizationIdsByUserId} from '@/lib/supabase';
import {Contact} from '@/types/Contact';
import {useUser} from "@/app/components/UserProvider";
import {CountryCode, parsePhoneNumberFromString} from 'libphonenumber-js';
import {User} from "@supabase/auth-js";
import {UUID} from "node:crypto";

interface ContactsProps {
    userId: string;
}

const Contacts: React.FC<ContactsProps> = ({userId}) => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch contacts on component mount
    useEffect(() => {
        const getContactsForOrganization = async () => {
            try {
                if(userId) {
                    let organizationId = await fetchOrganizationIdsByUserId(userId);
                    const fetchedContacts = await fetchContactsByOrganization(organizationId[0]);
                    setContacts(fetchedContacts);
                }
            } catch (error) {
                console.error('Error fetching contacts:', error);
            } finally {
                setLoading(false);
            }
        };

        getContactsForOrganization().then(r => r);
    }, []);

    const formatPhoneNumber = (number: string, countryCode: CountryCode = 'US') => {
        const phoneNumber = parsePhoneNumberFromString(number, countryCode);
        return phoneNumber ? phoneNumber.formatNational() : number;
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading Contacts...</Text>
            </View>
        );
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
                        <View style={styles.contactCard}>
                            <Text style={styles.contactName}>
                                {item.first_name} {item.last_name}
                            </Text>
                            <Text style={styles.contactEmail}>{item.email_address}</Text>
                            <Text style={styles.contactPhone}>{formatPhoneNumber(item.phone_number.toString())}</Text>
                        </View>
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
