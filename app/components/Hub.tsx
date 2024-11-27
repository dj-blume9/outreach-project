import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Account from "@/app/components/Account";
import { Session } from '@supabase/supabase-js';
import Contacts from "@/app/components/Contacts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Dashboard from "@/app/components/Dashboard";
import {Contact} from "@/types/Contact";
import {fetchContactsByOrganization, fetchOrganizationIdsByUserId, fetchUserById} from "@/lib/supabase";
import {User} from "@/types/User";

interface HubProps {
    session: Session;
}

const Hub: React.FC<HubProps> = ({ session }) => {
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>();
    
    const getUser = async () => {
        try {
            if(session.user.id) {
                let user = await fetchUserById(session.user.id);
                setUser(user);
            }
        }
        catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const getContactsForOrganization = async () => {
        try {
            if(session.user.id) {
                let organizationId = await fetchOrganizationIdsByUserId(session.user.id);
                const fetchedContacts = await fetchContactsByOrganization(organizationId[0]);
                setContacts(fetchedContacts);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const onRefresh = () => {
        getContactsForOrganization().then(r => r);
    }
    
    // Fetch contacts on component mount
    useEffect(() => {
        getContactsForOrganization().then(r => r);
        getUser().then(r => r);
    }, []);
    
    
    const renderComponent = () => {
        if(!user) return <Text>Loading...</Text>;
        switch (activeComponent) {
            case 'Dashboard':
                return <Dashboard user={user} contacts={contacts} onRefresh={onRefresh}/>;
            case 'Contacts':
                return <Contacts contacts={contacts} onRefresh={onRefresh}/>;
            default:
                return <Account key={session.user.id} session={session} />;
        }        
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>{renderComponent()}</View>
            <View style={styles.footer}>
                <TouchableOpacity  onPress={() => setActiveComponent('Dashboard')} style={styles.tab}>
                    <MaterialIcons name={'computer'} size={40} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveComponent('Contacts')} style={styles.tab}>
                    <MaterialIcons name={'contacts'} size={40} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveComponent('Forms')} style={styles.tab}>
                    <MaterialIcons name={'description'} size={40} color={'black'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    content: {
        paddingBottom: 100,
        height: '100%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f8f8f8',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        maxWidth: '100%'
    },
    component: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Hub;