import DefaultCard from "../../components/DefaultCard/DefaultCard.jsx";
import React from "react";
import AddTeacherForm from "./AddTeacherForm.jsx";
import {Box, Button, Typography} from "@mui/material";
import {Add as AddIcon} from '@mui/icons-material';
import TeachersTable from "./TeachersTable.jsx";
import {Link} from "react-router-dom";
import {useTeachers} from "../../hooks/useTeachers.js";

const Teachers = ({displayAddTeacherForm, setDisplayAddTeacherForm}) => {
    const {data: teachers} = useTeachers();

    return (
        <Box sx={{display: "flex", flexDirection: 'column'}}>
            <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
                <Typography variant="h6" component={Link} to="/" color="inherit" sx={{
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 700,
                    textAlign: 'left'
                }}>
                    {displayAddTeacherForm ? 'Add Teacher' : 'Teachers'}
                </Typography>
                {teachers?.length > 0 && !displayAddTeacherForm && (
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            variant="contained"
                            onClick={() => setDisplayAddTeacherForm(true)}
                            startIcon={<AddIcon/>}
                            sx={{
                                textTransform: 'none',
                                bgcolor: '#1976d2',
                                '&:hover': {
                                    bgcolor: '#1565c0',
                                },
                            }}>
                            Add Teacher
                        </Button>
                    </Box>)}

            </Box>
            {!teachers?.length && !displayAddTeacherForm &&
                <DefaultCard setAddForm={setDisplayAddTeacherForm} type={"teacher"}/>}
            {teachers?.length && !displayAddTeacherForm && <TeachersTable teachers={teachers}/>}
            {displayAddTeacherForm &&
                <AddTeacherForm setDisplayAddTeacherForm={setDisplayAddTeacherForm} teachers={teachers}/>}
        </Box>
    )
}

export default Teachers