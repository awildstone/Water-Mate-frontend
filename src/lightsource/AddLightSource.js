import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LightSourceForm from './LightSourceForm';

const AddLightSource = ({ close, setAddLight, handleAdd, roomId, current }) => {
    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Add Lightsource(s)
                    </Typography>
                    <Typography>
                        <p>
                            Select all light types that are applicable for your room.
                        </p>
                    </Typography>
                    <LightSourceForm close={close} setAddLight={setAddLight} handleAdd={handleAdd} roomId={roomId} current={current} />
                </Paper>
            </Box>
        </Container>
    );
}

export default AddLightSource;
