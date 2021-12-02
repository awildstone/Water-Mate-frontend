import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ProfileForm from './ProfileForm';

const EditProfile = ({close, setEditProfile, user }) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Profile
                    </Typography>
                    <Typography>
                        <p>
                            All fields required.
                        </p>
                    </Typography>
                   <ProfileForm  
                        close={close}
                        setEditProfile={setEditProfile}
                        user={user} 
                    />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditProfile;
