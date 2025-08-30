import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import "./module.bar.css"

const ModuleBar = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/classes') {
            return location.pathname === '/' || location.pathname === '/classes';
        }
        return location.pathname === path;
    };

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
                        '&:hover': {color: '#0d47a1'},

                    }}>
                        School Portal
                    </Typography>
                </Box>

                <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2}}>
                    <Button color="inherit" component={Link} to="/classes"
                            className={`nav-button ${isActive('/classes') ? 'active' : ''}`}>
                        Classes
                    </Button>
                    <Button color="inherit" component={Link} to="/teachers"
                            className={`nav-button ${isActive('/teachers') ? 'active' : ''}`}>
                        Teachers
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default ModuleBar;
