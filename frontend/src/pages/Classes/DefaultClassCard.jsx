import {Box, Button, Typography} from "@mui/material";
import React from "react";

const DefaultClassCard = ({setDisplayAddClassForm}) => {
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
                <Typography sx={{}}>There are no existing classes Yet</Typography>
                <Button sx={{
                    backgroundColor: '#135BB4',
                    color: "white",
                    textTransform: 'none',
                    p: '12px 16px',
                    borderRadius: '8px'
                }} onClick={() => {
                    setDisplayAddClassForm(true)
                }}>+ Add
                    Class</Button>
            </Box>
        </Box>
    )


}

export default DefaultClassCard;