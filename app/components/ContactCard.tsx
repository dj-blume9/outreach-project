import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatPhoneNumber} from "@/lib/helper";
import {deleteContact} from "@/lib/supabase";
import {Contact} from "@/types/Contact";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ContactCardProps {
    contact: Contact;
    adminControls: boolean;
    updateApp: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({contact, adminControls, updateApp}) => {

    const removeContact = async (contactId: number) => {
        try {
            await deleteContact(contactId);
            updateApp();
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    }
    
    return (
        <View style={styles.contactCard}>
            <View style={styles.contactDetails}>
                <Text style={styles.contactName}>
                    {contact.first_name} {contact.last_name}
                </Text>
                <Text style={styles.contactEmail}>{contact.email_address}</Text>
                <Text style={styles.contactPhone}>{formatPhoneNumber(contact.phone_number.toString())}</Text>
            </View>
            {adminControls && (
                <View style={styles.adminControlsContainer}>
                    <TouchableOpacity onPress={() => removeContact(contact.id)}>
                        <MaterialIcons name={'delete'} size={24} color={'#555'} /> 
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    contactCard: {
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '100%',
    },
    contactDetails: {
        flex: 1,
        marginRight: 8,
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
    adminControlsContainer: {
        backgroundColor: '#ececec',
        padding: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ContactCard;