import React from 'react';
import {Controller} from 'react-hook-form';
import {Box, MenuItem, TextField, Typography} from '@mui/material';

const FormSelect = ({name, label, control, options, rules, placeholder}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field, fieldState}) => {
                const placeholderText = `${placeholder}`;
                return (
                    <Box sx={{display: "flex", flexDirection: 'column', alignItems: "flex-start", gap: "1px", mb: 1}}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                color: '#333'
                            }}
                        >
                            {label}
                        </Typography>
                        <TextField
                            {...field}
                            select
                            variant="outlined"
                            fullWidth
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            sx={{
                                width: '464px',
                                height: '48px'
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
                    </Box>
                )
            }}
        />
    );
};

export default FormSelect;
