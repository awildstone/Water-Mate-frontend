import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PlantForm from './PlantForm';

const AddPlant = ({ close, setAddPlant, roomId, lightSources }) => {
    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Add Plant
                    </Typography>
                    <Typography>
                        <p>
                            All fields required.
                        </p>
                    </Typography>
                    <PlantForm
                        close={close}
                        setAddPlant={setAddPlant}
                        roomId={roomId}
                        lightSources={lightSources}
                    />
                </Paper>
            </Box>
        </Container>
    );
}

export default AddPlant;
