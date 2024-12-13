import React from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface DropdownFieldProps {
    title: string;
    value: string | null;
    setValue: (text: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    items: { label: string; value: string }[];
}

const DropdownField = ({ title, value, setValue, open, setOpen, items }:DropdownFieldProps) => (
    <View>
        <Text>{title}:</Text>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            //@ts-ignore
            setOpen={setOpen}
            //@ts-ignore
            setValue={setValue}
            style={{ marginBottom: open ? items.length * 50 : 50 }}
            scrollViewProps={{ nestedScrollEnabled: true }}
        />
    </View>
);

export default DropdownField;
