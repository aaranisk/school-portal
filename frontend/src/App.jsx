import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import ModuleBar from './components/ModuleBar/ModuleBar.jsx';
import Teachers from './pages/Teachers/Teachers.jsx';
import Classes from './pages/Classes/Classes.jsx';
import {Box} from "@mui/material";
import './App.css'
import {useState} from "react";

function App() {
    const [displayAddTeacherForm, setDisplayAddTeacherForm] = useState(false);
    return (
        <Router>
            <ModuleBar/>
            <Box sx={{
                mt: 10,
                ml: '5rem',
                mr: '5rem',
                bgcolor: 'white',
                width: 'calc(100vw - 10rem)',
                maxWidth: 'none'
            }}>
                <Routes>
                    <Route path="/teachers" element={<Teachers displayAddTeacherForm={displayAddTeacherForm}
                                                               setDisplayAddTeacherForm={setDisplayAddTeacherForm}/>}/>
                    <Route path="/classes" element={<Classes setDisplayAddTeacherForm={setDisplayAddTeacherForm}/>}/>
                    <Route path="/" element={<Navigate to="/classes" replace/>}/>
                </Routes>

            </Box>
        </Router>
    )
}

export default App
