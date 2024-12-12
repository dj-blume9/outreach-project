import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Account from "@/app/components/Account";
import { Session } from '@supabase/supabase-js';
import Contacts from "@/app/components/Contacts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Dashboard from "@/app/components/Dashboard";
import {Contact} from "@/types/Contact";
import usersApi from "@/api/usersApi";
import organizationsApi from "@/api/organizationsApi";
import contactsApi from "@/api/contactsApi";
import {User} from "@/types/User";

interface HubProps {
    session: Session;
}

const Hub: React.FC<HubProps> = ({ session }) => {
    const [activeComponent, setActiveComponent] = useState('Dashboard');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>();
    const [refreshKey, setRefreshKey] = useState<number>(0);
    
    const getUser = async () => {
        try {
            if(session.user.id) {
                let user = await usersApi.fetchUserById(session.user.id);
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
                let organizationId = await organizationsApi.fetchOrganizationIdsByUserId(session.user.id);
                const fetchedContacts = await contactsApi.fetchContactsByOrganization(organizationId[0]);
                setContacts(fetchedContacts);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const updateApp = async () => {
        await getContactsForOrganization().then(r => r);
        setRefreshKey(refreshKey + 1);
    }
    
    // Fetch contacts on component mount
    useEffect(() => {
        const fetchData = async () => {
            await getUser();
            await getContactsForOrganization();
        };
        fetchData();
    }, []);
    
    const renderComponent = () => {
        if(loading) return <Text>Loading...</Text>;
        if(!user) return <Text>Loading...</Text>;
        switch (activeComponent) {
            case 'Dashboard':
                return <Dashboard key={refreshKey} user={user} contacts={contacts} updateApp={updateApp}/>;
            case 'Contacts':
                return <Contacts key={refreshKey} contacts={contacts} updateApp={updateApp} user={user}/>;
            case 'Account':
                return <Account key={refreshKey} session={session} />;
            default:
                return <Account key={refreshKey} session={session} />;
        }        
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setActiveComponent('Account')}>
                    <MaterialIcons name={'settings'} size={40} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={updateApp}>
                    <MaterialIcons name={'refresh'} size={40} color={'black'} />
                </TouchableOpacity>
            </View>
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
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
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