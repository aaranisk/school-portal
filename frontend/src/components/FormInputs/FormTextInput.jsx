import {Controller} from "react-hook-form";
import {Box, TextField, Typography} from "@mui/material";

const FormTextField = ({name, control, label, rules = {}, numericOnly = false}) => {
    const handleBeforeInput = (e) => {
        if (numericOnly && /\D/.test(e.data)) {
            e.preventDefault();
        }
    };
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field, fieldState}) => (
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
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error ? fieldState.error.message : ""}
                        sx={{width: '464px', height: '48px'}}
                        placeholder={label}
                        onBeforeInput={handleBeforeInput}
                    />
                </Box>
            )}
        />
    );
};

export default FormTextField;
