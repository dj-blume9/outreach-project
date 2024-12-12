import { useEffect, useState } from 'react';
import usersApi from '@/api/usersApi';
import {addNewContact} from '@/lib/contactsHelper';

const useContactForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [dropdownValue, setDropdownValue] = useState('unassigned');
    const [assignableUsers, setAssignableUsers] = useState([{ label: 'Unassigned', value: 'unassigned' }]);

    useEffect(() => {
        const fetchAssignableUsers = async () => {
            try {
                const users = await usersApi.fetchUsersByOrganization(1);
                const userOptions = users.map((user) => ({ label: user.full_name, value: user.id }));
                setAssignableUsers((prev) => [...prev, ...userOptions]);
            } catch (error) {
                console.error('Error fetching assignable users:', error);
            }
        };
        fetchAssignableUsers();
    }, []);

    useEffect(() => {
        setIsDisabled(!(firstName && lastName && email && phoneNumber));
    }, [firstName, lastName, email, phoneNumber]);

    const handleSubmit = async () => {
        const contact = {
            first_name: firstName,
            last_name: lastName,
            email_address: email,
            phone_number: phoneNumber,
            assigned_user_id: dropdownValue !== 'unassigned' ? dropdownValue : null,
        };

        try {
            await addNewContact(contact, 1);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setDropdownValue('unassigned');
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const inputs: InputItem[] = [
        { id: 'first_name', value: firstName, setValue: setFirstName, title: 'First Name', type: 'text' },
        { id: 'last_name', value: lastName, setValue: setLastName, title: 'Last Name', type: 'text' },
        { id: 'email_address', value: email, setValue: setEmail, title: 'Email Address', type: 'text' },
        { id: 'phone_number', value: phoneNumber, setValue: setPhoneNumber, title: 'Phone Number', type: 'text' },
        { id: 'user_assignment', value: dropdownValue, setValue: setDropdownValue, title: 'Assigned To', type: 'dropdown' },
    ];

    return {
        inputs,
        assignableUsers,
        dropdownOpen,
        setDropdownOpen,
        isDisabled,
        handleSubmit,
    };
};

export default useContactForm;
