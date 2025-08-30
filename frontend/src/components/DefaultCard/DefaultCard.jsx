import {Box, Button, Typography} from "@mui/material";
import {Add as AddIcon} from '@mui/icons-material';
import React from "react";

const DefaultCard = ({setAddForm, type}) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 5,
            borderRadius: 4,
            height: '60vh',
            color: 'black',
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                <Typography
                    sx={{fontWeight: 800}}>{`There are no existing ${type === "class" ? "classes" : "teachers"} yet`}</Typography>
                <Button
                    startIcon={<AddIcon/>}
                    sx={{
                        backgroundColor: '#135BB4',
                        color: "white",
                        textTransform: 'none',
                        p: '12px 16px',
                        borderRadius: '8px'

                    }} onClick={() => {
                    setAddForm(true)
                }}>{`Add ${type === "class" ? "Class" : "Teacher"}`}</Button>
            </Box>
        </Box>
    )
}

export default DefaultCard;