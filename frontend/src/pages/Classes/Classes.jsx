import {Box, Button, Typography} from "@mui/material";
import {Add as AddIcon} from '@mui/icons-material';
import {Link} from "react-router-dom";
import React, {useState} from "react";
import DefaultClassCard from "./DefaultClassCard.jsx";
import ClassesTable from "./ClassesTable.jsx";
import AddClassForm from "./AddClassForm.jsx";

const Classes = () => {
    const [displayAddClassForm, setDisplayAddClassForm] = useState(false);
    // const classes = []
    const classes = [
        {classLevel: 'Primary 1', className: 'A', formTeacher: 'Mr. Smith'},
        {classLevel: 'Primary 2', className: 'B', formTeacher: 'Ms. Johnson'},
        {classLevel: 'Primary 3', className: 'C', formTeacher: 'Mrs. Lee'},
        {classLevel: 'Primary 1', className: 'B', formTeacher: 'Mr. Smith'},
        {classLevel: 'Primary 2', className: 'C', formTeacher: 'Ms. Johnson'},
        {classLevel: 'Primary 3', className: 'A', formTeacher: 'Mrs. Lee'},
        {classLevel: 'Primary 1', className: 'C', formTeacher: 'Mr. Smith'},
        {classLevel: 'Primary 2', className: 'A', formTeacher: 'Ms. Raj'},
        {classLevel: 'Primary 3', className: 'B', formTeacher: 'Mrs. Lee'},
        {classLevel: 'Primary 1', className: 'A', formTeacher: 'Mr. Sam'},]
    return <Box sx={{display: "flex", flexDirection: 'column'}}>
        <Box sx={{display: "flex", justifyContent: "space-between", mb: 2}}>
            <Typography variant="h6" component={Link} to="/" color="inherit" sx={{
                textDecoration: 'none',
                color: 'black',
                fontWeight: 700,
                textAlign: 'left'
            }}>
                {displayAddClassForm ? 'Add Class' : 'Classes'}
            </Typography>
            {classes.length > 0 && !displayAddClassForm && (
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={() => setDisplayAddClassForm(true)}
                        sx={{
                            textTransform: 'none',
                            bgcolor: '#1976d2',
                            '&:hover': {
                                bgcolor: '#1565c0',
                            },
                        }}
                    >
                        Add Class
                    </Button>
                </Box>
            )}
        </Box>

        {!classes.length && !displayAddClassForm && <DefaultClassCard setDisplayAddClassForm={setDisplayAddClassForm}/>}
        {classes.length && !displayAddClassForm && <ClassesTable classes={classes}/>}
        {displayAddClassForm && <AddClassForm setDisplayAddClassForm={setDisplayAddClassForm} classes={classes}/>}
    </Box>
}

export default Classes