import React from 'react';
import {Link} from 'react-router-dom';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const ModuleBar = () => {
    return (
        <AppBar position="fixed" color="default" sx={{backgroundColor: "white", boxShadow: 1}}>
            <Toolbar>
                <Box sx={{
                    display: 'flex', alignItems: 'center', gap: 2, mr: 4,

                }}>
                    <SchoolIcon sx={{mr: 1, color: '#135BB4'}}/>
                    <Typography variant="h6" component={Link} to="/" color="inherit" sx={{
                        textDecoration: 'none',
                        color: '#135BB4',
                        fontWeight: 700,
                        '&:hover': {color: '#0d47a1'}
                    }}>
                        School Portal
                    </Typography>
                </Box>

                <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2}}>
                    <Button color="inherit" component={Link} to="/classes" sx={{
                        color: '#135BB4', fontWeight: 600,
                        '&:hover': {color: '#0d47a1'}
                    }}>
                        Classes
                    </Button>
                    <Button color="inherit" component={Link} to="/teachers"
                            sx={{color: '#135BB4', fontWeight: 600, '&:hover': {color: '#0d47a1'}}}>
                        Teachers
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default ModuleBar;
