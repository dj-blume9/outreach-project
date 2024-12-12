import React from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface DropdownFieldProps {
    title: string;
    value: string | null;
    setValue: React.Dispatch<React.SetStateAction<string | null>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    items: { label: string; value: string }[];
}

const DropdownField = ({ title, value, setValue, open, setOpen, items }:DropdownFieldProps) => (
    <View>
        <Text>{title}:</Text>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            style={{ marginBottom: open ? 200 : 50 }}
            scrollViewProps={{ nestedScrollEnabled: true }}
        />
    </View>
);

export default DropdownField;
