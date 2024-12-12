// AddContactFormBase.tsx
import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useContactForm from '@/app/hooks/useContactForm';
import InputField from '@/app/components/InputField';
import DropdownField from '@/app/components/DropdownField';

const AddContactFormBase = () => {
    const {
        inputs,
        assignableUsers,
        dropdownOpen,
        setDropdownOpen,
        isDisabled,
        handleSubmit,
    } = useContactForm();

    const renderItem = ({ item } : {item: InputItem}) => {
        return item.type === 'text' ? (
            <InputField {...item} />
        ) : (
            <DropdownField
                {...item}
                items={assignableUsers}
                open={dropdownOpen}
                setOpen={setDropdownOpen}
            />
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaProvider>
                <SafeAreaView>
                    <FlatList
                        data={inputs}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        nestedScrollEnabled
                        keyboardShouldPersistTaps="handled"
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <TouchableOpacity
                style={[styles.addContactButton, isDisabled && styles.addContactButtonDisabled]}
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
