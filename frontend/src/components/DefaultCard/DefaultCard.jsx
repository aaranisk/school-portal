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
            width: '1344px',
            height: '636px',
            color: 'black',
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography>{`There are no existing ${type === "class" ? "classes" : "teachers"} yet`}</Typography>
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