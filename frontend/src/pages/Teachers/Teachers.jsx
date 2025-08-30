import DefaultCard from "../../components/DefaultCard/DefaultCard.jsx";
import React, {useState} from "react";
import AddTeacherForm from "./AddTeacherForm.jsx";
import {Box, Button, Typography} from "@mui/material";
import {Add as AddIcon} from '@mui/icons-material';
import TeachersTable from "./TeachersTable.jsx";
import {Link} from "react-router-dom";

const Teachers = () => {
    const [displayAddTeacherForm, setDisplayAddTeacherForm] = useState(false);
    // const teachers = []
    const teachers = [
        {
            id: 1,
            name: "Hannah Low",
            subject: "Science",
            email: "hannah@gmail.com",
            workContact: "6736 3939"
        },
        {
            id: 2,
            name: "Wong Sze Ting",
            subject: "Mathematics",
            email: "wong@gmail.com",
            workContact: "6383 3837"
        },
        {
            id: 3,
            name: "Justin Xiong",
            subject: "Social Studies",
            email: "justin@gmail.com",
            workContact: "6837 3838"
        },
        {
            id: 4,
            name: "Billy Tan",
            subject: "Character and Citizenship Education",
            email: "billy@gmail.com",
            workContact: "6777 4848"
        },
        {
            id: 5,
            name: "Gao Ah Xing",
            subject: "English Language",
            email: "gao@gmail.com",
            workContact: "6849 4942"
        },
        {
            id: 6,
            name: "Chen Bing Bing",
            subject: "Physical Education",
            email: "bingbing@gmail.com",
            workContact: "6968 3839"
        }
    ];
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
                {teachers.length > 0 && !displayAddTeacherForm && (
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
            {!teachers.length && !displayAddTeacherForm &&
                <DefaultCard setAddForm={setDisplayAddTeacherForm} type={"teacher"}/>}
            {teachers.length && !displayAddTeacherForm && <TeachersTable teachers={teachers}/>}
            {displayAddTeacherForm &&
                <AddTeacherForm setDisplayAddTeacherForm={setDisplayAddTeacherForm} teachers={teachers}/>}
        </Box>
    )
}

export default Teachers