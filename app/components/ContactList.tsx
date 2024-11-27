import React, {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {Contact} from "@/types/Contact";
import ContactCard from "@/app/components/ContactCard";

interface ContactListProps {
    contacts: Contact[]
    onRefresh: () => void;
}

const ContactList: React.FC<ContactListProps> = ({contacts, onRefresh}) => {
    const [refreshing, setRefreshing] = useState(false);
    
    const swipeToRefresh = () => {
        setRefreshing(true);
        onRefresh();
        setRefreshing(false);
    }

    return (
        <FlatList
            data={contacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <ContactCard contact={item} adminControls={true} />
            )}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={swipeToRefresh} />
            }
        />
    );
};

const styles = StyleSheet.create({});

export default ContactList;