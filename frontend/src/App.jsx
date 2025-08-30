import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import ModuleBar from './components/ModuleBar/ModuleBar.jsx';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes/Classes.jsx';
import {Box} from "@mui/material";
import './App.css'

function App() {
    return (
        <Router>
            <ModuleBar/>
            <Box sx={{
                mt: 10,
                bgcolor: 'white',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Routes>
                    <Route path="/teachers" element={<Teachers/>}/>
                    <Route path="/classes" element={<Classes/>}/>
                    <Route path="/" element={<Navigate to="/classes" replace/>}/>
                </Routes>

            </Box>
        </Router>
    )
}

export default App
