import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";

const FormTextField = ({name, control, label, rules = {}}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field, fieldState}) => (
                <TextField
                    {...field}
                    label={label}
                    fullWidth
                    margin="normal"
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : ""}
                    sx={{width: '464px'}}
                    InputLabelProps={{shrink: true}}
                    placeholder={label}
                />
            )}
        />
    );
};

export default FormTextField;
