import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../App.css';

const LoadingCollection = () => {
    return (
        <Container maxWidth="lg">
            <Grid container direction='row' spacing={2} textAlign='center'>
                <Grid item md={12} mt={4}>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Loading Collection
                    </Typography>
                    <div className="lds-heart"><div></div></div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default LoadingCollection;