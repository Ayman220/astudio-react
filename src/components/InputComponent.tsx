import { OutlinedInput } from '@mui/material';
import React from 'react';

interface InputProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const InputComponent: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
    return (
        <OutlinedInput
            size="small"
            type="text"
            sx={{ width: "150px" }}
            value={value}
            placeholder={placeholder ?? "Input..."}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default InputComponent;