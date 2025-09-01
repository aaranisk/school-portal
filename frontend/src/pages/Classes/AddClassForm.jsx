import React from 'react';
import {Box, Button, MenuItem, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import FormSelect from "../../components/FormInputs/FormSelect.jsx";
import FormTextField from "../../components/FormInputs/FormTextInput.jsx";
import {ArrowBack} from '@mui/icons-material';
import {useTeachers} from "../../hooks/useTeachers.js";
import {useNavigate} from "react-router-dom";
import {useCreateClass} from "../../hooks/useClasses.js";

const AddClassForm = ({setDisplayAddClassForm, classes, setDisplayAddTeacherForm}) => {
    const createClassMutation = useCreateClass();
    const navigate = useNavigate();
    const classLevels = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'];
    const {data: teachers} = useTeachers();
    const {handleSubmit, control, reset} = useForm({
        defaultValues: {
            level: '',
            name: '',
            teacherEmail: '',
        },
    });
    const onSubmit = (data) => {
        createClassMutation.mutate(data)
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
                    options={teachers?.length > 0 ? teachers : [{name: "No existing teachers.", email: ""}]}
                    rules={{required: 'Form Teacher is required.'}}
                    placeholder="Assign a form teacher"
                    customMenuItem={(option) => {
                        if (!option.email) {
                            return (
                                <MenuItem key={option} value="" sx={{pointerEvents: 'auto'}}>
                                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                        <Typography color="textPrimary">No existing teachers.</Typography>
                                        <Typography
                                            color="#75489F"
                                            sx={{cursor: 'pointer'}}
                                            onClick={() => {
                                                setDisplayAddTeacherForm(true)
                                                navigate('/teachers')
                                            }}
                                        >
                                            Add a teacher
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            );
                        }
                        return <MenuItem key={option.email} value={option.email}>{option.name}</MenuItem>;
                    }}
                />


            </Box>
            <Box sx={{display: 'flex', gap: 2, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Button
                    startIcon={<ArrowBack/>}
                    sx={{
                        border: "1px solid #135BB4",
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                    onClick={() => {
                        setDisplayAddClassForm(false)
                    }}>Back</Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mt: 2, backgroundColor: '#135BB4', textTransform: 'none'}}
                >
                    Add Class
                </Button>
            </Box>

        </Box>
    );
};

export default AddClassForm;
