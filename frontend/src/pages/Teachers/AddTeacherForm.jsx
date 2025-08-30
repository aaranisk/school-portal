import {Box, Button} from "@mui/material";
import FormSelect from "../../components/FormInputs/FormSelect.jsx";
import FormTextField from "../../components/FormInputs/FormTextInput.jsx";
import React from "react";
import {Add as AddIcon} from '@mui/icons-material';
import {useForm} from "react-hook-form";

const AddTeacherForm = ({setDisplayAddTeacherForm}) => {

    const {handleSubmit, control, reset} = useForm({
        defaultValues: {
            name: '',
            subject: '',
            email: '',
            contactNumber: '',
        },
    });
    const subjects = ['English Language', 'Mother Tongue Language', 'Mathematics', 'Science', 'Art', 'Music', 'Physical Education', 'Social Studies', 'Character and Citizenship Education']
    const onSubmit = (data) => {
        console.log("on submit")
        reset();
        setDisplayAddTeacherForm(false)
    };

    return (
        <Box component="form"
             onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 4,
                    boxShadow: 5,
                    borderRadius: 2,
                }}
            >
                <FormTextField
                    name="name"
                    control={control}
                    label="Name"
                    rules={{
                        required: 'Name is required.',
                        minLength: {value: 1, message: 'Name must be at least 1 character'},
                        maxLength: {value: 50, message: 'Name cannot exceed 50 characters'}
                    }}
                />
                <FormSelect
                    name="subject"
                    label="Subject"
                    control={control}
                    options={subjects}
                    rules={{required: 'Subject is required.'}}
                    placeholder={"Select a subject"}
                />


                <FormTextField
                    name="email"
                    control={control}
                    label="Email Address"
                    rules={{
                        required: 'Email address is required.',
                        pattern: {
                            value: /^[a-zA-Z0-9]+@gmail\.com$/,
                            message: 'This email is invalid.'
                        }
                    }}
                />
                <FormTextField
                    name="contactNumber"
                    control={control}
                    label="Work Contact Number"
                    rules={{
                        required: 'Work contact number is required.',
                        pattern: {
                            value: /^6\d{7}$/,
                            message: 'This work contact number is invalid.'
                        }
                    }}
                />

            </Box>
            <Box sx={{display: 'flex', gap: 2, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Button sx={{border: "1px solid #135BB4"}} onClick={() => {
                    setDisplayAddTeacherForm(false)
                }}>Back</Button>
                <Button
                    startIcon={<AddIcon/>}
                    type="submit"
                    variant="contained"
                    sx={{mt: 2, backgroundColor: '#135BB4', textTransform: 'none',}}
                >
                    Add Teacher
                </Button>
            </Box>

        </Box>
    );
}

export default AddTeacherForm;