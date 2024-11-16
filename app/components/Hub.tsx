import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Account from "@/app/components/Account";
import { Session } from '@supabase/supabase-js';
import Contacts from "@/app/components/Contacts";

interface HubProps {
    session: Session;
}

const Hub: React.FC<HubProps> = ({ session }) => {
    const [activeComponent, setActiveComponent] = useState('Home');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Account':
                return <Account key={session.user.id} session={session} />;
            case 'Contacts':
                return <Contacts />;
            default:
                return <Account key={session.user.id} session={session} />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>{renderComponent()}</View>
            <View style={styles.footer}>
                <TouchableOpacity  onPress={() => setActiveComponent('Account')} style={styles.tab}>
                    <Text style={styles.text}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveComponent('Contacts')} style={styles.tab}>
                    <Text style={styles.text}>Contacts</Text>
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
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tab: {
        width: '50%',
    }
});

export default Hub;