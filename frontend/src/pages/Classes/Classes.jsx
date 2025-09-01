import {Box, Button, Typography} from "@mui/material";
import {Add as AddIcon} from '@mui/icons-material';
import {Link} from "react-router-dom";
import React, {useState} from "react";
import ClassesTable from "./ClassesTable.jsx";
import AddClassForm from "./AddClassForm.jsx";
import DefaultCard from "../../components/DefaultCard/DefaultCard.jsx";
import {useClasses} from "../../hooks/useClasses.js";

const Classes = ({setDisplayAddTeacherForm}) => {
    const {data: classes} = useClasses();
    const [displayAddClassForm, setDisplayAddClassForm] = useState(false);
    
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
            {classes?.length > 0 && !displayAddClassForm && (
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

        {!classes?.length && !displayAddClassForm && <DefaultCard setAddForm={setDisplayAddClassForm} type={"class"}/>}
        {classes?.length && !displayAddClassForm && <ClassesTable classes={classes}/>}
        {displayAddClassForm && <AddClassForm setDisplayAddClassForm={setDisplayAddClassForm} classes={classes}
                                              setDisplayAddTeacherForm={setDisplayAddTeacherForm}/>}
    </Box>
}

export default Classes