import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditPasswordForm from './EditPasswordForm';

const EditPassword = ({close, handleEdit, user}) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Password
                    </Typography>
                    <p>All fields required.</p>
                   <EditPasswordForm close={close} handleEdit={handleEdit} user={user} />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditPassword;