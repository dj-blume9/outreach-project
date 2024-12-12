import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    SafeAreaView,
    FlatList
} from 'react-native';
import { User } from "@/types/User";
import {Contact} from "@/types/Contact";
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaProvider} from "react-native-safe-area-context";
import usersApi from "@/api/usersApi";

interface AddContactFormBaseProps {
    user: User;
}

const AddContactFormBase: React.FC<AddContactFormBaseProps> = ({ user }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('unassigned');
    const [assignableUsers, setAssignableUsers] = useState([
        { label: 'Unassigned', value: 'unassigned' }
    ]);
    const [newContact, setNewContact] = useState<Contact>();

    useEffect(() => {
        // Fetch assignable users
        const fetchAssignableUsers = async () => {
            try {
                const users = await usersApi.fetchUsersByOrganization(1);
                const newAssignableUsers = users.map((user) => {
                    return { label: user.full_name, value: user.id };
                });
                setAssignableUsers(assignableUsers.concat(newAssignableUsers));
            } catch (error) {
                console.error('Error fetching assignable users:', error);
            }
        }
        fetchAssignableUsers();
    }, []);

    // Update isDisabled when any input changes
    useEffect(() => {
        setIsDisabled(!(firstName && lastName && email && phoneNumber));
    }, [firstName, lastName, email, phoneNumber]);

    const inputs = [
        { id: 'first_name', value: firstName, setValue: setFirstName, title: 'First Name', type: 'text' },
        { id: 'last_name', value: lastName, setValue: setLastName, title: 'Last Name', type: 'text' },
        { id: 'email_address', value: email, setValue: setEmail, title: 'Email Address', type: 'text' },
        { id: 'phone_number', value: phoneNumber, setValue: setPhoneNumber, title: 'Phone Number', type: 'text' },
        { id: 'user_assignment', value: dropdownValue, setValue: setDropdownValue, title: 'Assigned To', type: 'dropdown' },
    ];

    type itemProps = {
        id: string;
        value: string | null;
        setValue: (value: string) => void;
        title: string;
        type: string;
    }

    const Item = ({id, value, setValue, title, type}: itemProps) => {
        if(type === 'text')
        {
            return (
                <View>
                    <Text>{title}:</Text>
                    <TextInput
                        id={id}
                        style={styles.input}
                        value={value || ''}
                        onChangeText={setValue}
                        keyboardType={id === 'phone_number' ? 'phone-pad' : 'default'}
                    />
                </View>
            );
        }
        else if(type === 'dropdown')
        {
            return (
                <View>
                    <Text>{title}:</Text>
                    <DropDownPicker
                        style={ dropdownOpen ? {marginBottom: assignableUsers.length * 50} : {marginBottom: 50}}
                        open={dropdownOpen}
                        value={dropdownValue}
                        items={assignableUsers}
                        setOpen={setDropdownOpen}
                        setValue={setDropdownValue}
                        setItems={setAssignableUsers}
                        scrollViewProps={{
                            nestedScrollEnabled: true
                        }}
                    />
                </View>
            );
        }
    }

    const handleSubmit = async () => {
        // Create new contact object
        const contact: Contact = {
            first_name: firstName,
            last_name: lastName,
            email_address: email,
            phone_number: phoneNumber,
            assigned_user_id: dropdownValue !== 'unassigned' ? dropdownValue : null,
        };
        setNewContact(contact);

        // Clear form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setDropdownValue('unassigned');
    }

    return (
        <View style={styles.container}>
            <SafeAreaProvider>
                <SafeAreaView>
                    <FlatList
                        data={inputs}
                        renderItem={
                            ({item}) =>
                                    <Item
                                        id={item.id}
                                        setValue={item.setValue}
                                        title={item.title}
                                        value={item.value}
                                        type={item.type}
                                    />

                        }
                        keyExtractor={item => item.id}
                        nestedScrollEnabled={true}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <TouchableOpacity
                style={[styles.addContactButton, isDisabled ? styles.addContactButtonDisabled : null]}
                disabled={isDisabled}
                onPress={handleSubmit}
            >
                <Text style={styles.addContactButtonText}>Add Contact</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        width: '100%',
        flex: 1,
    },
    dropdownOpen: {
        marginBottom: 500,
    },
    input: {
        padding: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    addContactButton: {
        backgroundColor: '#007b55',
        padding: 8,
        borderRadius: 4,
    },
    addContactButtonDisabled: {
        backgroundColor: '#555',
    },
    addContactButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default AddContactFormBase;
