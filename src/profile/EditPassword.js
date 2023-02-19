import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PasswordForm from './PasswordForm';

const EditPassword = ({ close, setEditPassword, user }) => {
    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Password
                    </Typography>
                    <Typography>
                        <p>
                            All fields required.
                        </p>
                    </Typography>
                    <PasswordForm close={close} setEditPassword={setEditPassword} user={user} />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditPassword;