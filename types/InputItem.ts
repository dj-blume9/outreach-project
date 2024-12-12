type InputItem = {
    id: string;
    value: string | null;
    setValue: (value: string) => void;
    title: string;
    type: 'text' | 'dropdown';
};