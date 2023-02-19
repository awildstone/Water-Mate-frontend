import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import '../App.css';

const LoadingRoom = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Grid container direction='row' spacing={2} alignItems="stretch">
                        <Grid item md={12}>
                            <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                                Loading Room
                            </Typography>
                            <div className="lds-heart"><div></div></div>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
}

export default LoadingRoom;
