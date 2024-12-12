import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Modal} from 'react-native';
import {Contact} from '@/types/Contact';
import ContactCard from "@/app/components/ContactCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AddContactModal from "@/app/components/AddContactModal";
import {User} from "@/types/User";

interface ContactsProps {
    contacts: Contact[];
    updateApp: () => void;
    user: User;
}

const Contacts: React.FC<ContactsProps> = ({ contacts, updateApp, user}) => {
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <View style={styles.container}>
            <AddContactModal user={user} visible={modalVisible} onClose={() => setModalVisible(false)}/>
            <View style={styles.header}>
                <Text style={styles.headerText}>Contacts</Text>
                <TouchableOpacity style={styles.addContactButton} onPress={() => setModalVisible(true)}>
                    <MaterialIcons name={'person-add'} size={34} color={'#111'} />
                </TouchableOpacity>
            </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        maxWidth: '100%',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        flex: 1
    },
    addContactButton: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 4,
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
