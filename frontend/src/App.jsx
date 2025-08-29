import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ModuleBar from './components/ModuleBar.jsx';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import {Box} from "@mui/material";
import './App.css'

function App() {
    return (
        <Router>
            <ModuleBar/>
            <Box sx={{mt: 8, bgcolor: 'white'}}>
                <Routes>
                    <Route path="/teachers" element={<Teachers/>}/>
                    <Route path="/classes" element={<Classes/>}/>
                    <Route path="/" element={<Classes/>}/>
                </Routes>
            </Box>
        </Router>
    )
}

export default App
