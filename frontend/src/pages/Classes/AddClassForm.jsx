import React from 'react';
import {Box, Button} from '@mui/material';
import {useForm} from 'react-hook-form';
import FormSelect from "../../components/FormInputs/FormSelect.jsx";
import FormTextField from "../../components/FormInputs/FormTextInput.jsx";

const AddClassForm = ({setDisplayAddClassForm, classes}) => {
    const classLevels = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'];
    const teachers = ['Mr. Smith', 'Ms. Johnson', 'Mrs. Lee'];

    const {handleSubmit, control, reset} = useForm({
        defaultValues: {
            level: '',
            name: '',
            teacherEmail: '',
        },
    });
    const onSubmit = (data) => {
        classes.push(data)
        reset();
        setDisplayAddClassForm(false)
    };

    return (
        <Box component="form"
             onSubmit={handleSubmit(onSubmit)}>
            <Box

                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '1344px',
                    p: 4,
                    boxShadow: 5,
                    borderRadius: 2,
                }}
            >

                <FormSelect
                    name="level"
                    label="Class Level"
                    control={control}
                    options={classLevels}
                    rules={{required: 'Class level is required.'}}
                    placeholder={"Select a level"}
                />

                <FormTextField
                    name="name"
                    control={control}
                    label="Class Name"
                    rules={{
                        required: 'Class Name is required.',
                        minLength: {value: 1, message: 'Class name must be at least 1 character.'},
                        maxLength: {value: 50, message: 'Class name cannot exceed 50 characters.'}
                    }}
                />

                <FormSelect
                    name="teacherEmail"
                    label="Form Teacher"
                    control={control}
                    options={teachers}
                    rules={{required: 'Form Teacher is required.'}}
                    placeholder={"Assign a class teacher"}
                />

            </Box>
            <Box sx={{display: 'flex', gap: 2, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Button sx={{border: "1px solid #135BB4"}} onClick={() => {
                    setDisplayAddClassForm(false)
                }}>Back</Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 2, backgroundColor: '#135BB4', textTransform: 'none',}}
                >
                    + Add Class
                </Button>
            </Box>

        </Box>
    );
};

export default AddClassForm;
