import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoginForm from '../forms/LoginForm';

const Login = ({ setToken, setRefreshToken }) => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 0 } }}>
                <Paper>
                    <Box sx={{ m: 2 }}>
                        <Typography variant="h2" component="div" sx={{ marginLeft: 3 }}>
                            Login
                        </Typography>
                        <Typography component="div" sx={{ marginLeft: 3 }}>
                            <p>
                                Welcome back ツ
                            </p>
                        </Typography>
                        <LoginForm setToken={setToken} setRefreshToken={setRefreshToken} />
                    </Box>
                    <img src="/images/profile_plants.png" width='100%' alt='Succulent Terrariums on Profile Page' />
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;
