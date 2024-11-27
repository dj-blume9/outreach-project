import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {formatPhoneNumber} from "@/lib/helper";
import {Contact} from "@/types/Contact";

interface ContactCardProps {
    contact: Contact;
    adminControls: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({contact, adminControls}) => {


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
                    <Text>Admin Controls</Text>
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