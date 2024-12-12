import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Modal, Text, TouchableOpacity} from 'react-native';
import {getNewContacts, getUnassignedContacts} from "@/lib/contactsHelper";
import AddContactFormBase from "@/app/components/AddContactFormBase";
import {User} from "@/types/User";

interface AddContactModalProps {
    user: User;
    visible: boolean;
    onClose: () => void;
}

const AddContactModal: React.FC<AddContactModalProps> = ({ user, visible, onClose }) => {
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose} // Handle Android back button
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <AddContactFormBase user={user}/>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent background
    },
    modalContent: {
        width: '80%', // Optional, adjust modal width
        height: '50%', // 50% of screen height
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddContactModal;