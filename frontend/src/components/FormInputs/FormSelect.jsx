import React from 'react';
import {Controller} from 'react-hook-form';
import {MenuItem, TextField} from '@mui/material';

const FormSelect = ({name, label, control, options, rules, placeholder}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field, fieldState}) => {
                const placeholderText = `${placeholder}`;
                return (
                    <TextField
                        {...field}
                        select
                        label={label}
                        variant="outlined"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        InputLabelProps={{shrink: true}}
                        sx={{
                            width: '464px',
                        }}
                        SelectProps={{
                            displayEmpty: true,
                            renderValue: (selected) => {
                                if (!selected) return <span style={{
                                    color: '#999',
                                    textAlign: 'left',
                                    display: 'block'
                                }}>{`${placeholderText}`}</span>;
                                return selected;
                            },
                        }}
                    >

                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                )
            }}
        />
    );
};

export default FormSelect;
