import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
    id: string;
    value: string | null;
    setValue: (text: string) => void;
    title: string;
}

const InputField = ({ id, value, setValue, title }:InputFieldProps) => (
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

const styles = StyleSheet.create({
    input: {
        padding: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
});

export default InputField;
