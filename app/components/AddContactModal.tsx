import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Modal, Text, TouchableOpacity} from 'react-native';
import {getNewContacts, getUnassignedContacts} from "@/lib/contactsHelper";

interface AddContactModalProps {
    visible: boolean;
    onClose: () => void;
}

const AddContactModal: React.FC<AddContactModalProps> = ({ visible, onClose }) => {
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose} // Handle Android back button
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text>Hello, I'm a modal!</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
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
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
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