import React, {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Contact} from "@/types/Contact";
import ContactCard from "@/app/components/ContactCard";

interface ContactListProps {
    contacts: Contact[]
    updateApp: () => void;
}

const ContactList: React.FC<ContactListProps> = ({contacts, updateApp}) => {


    return (
        <FlatList
            data={contacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ContactCard contact={item} adminControls={true} updateApp={updateApp}/>
            )}
        />
    );
};

const styles = StyleSheet.create({});

export default ContactList;