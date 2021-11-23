import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SignupForm from '../forms/SignupForm';

const Signup = ({setToken}) => {
    return(
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 0 } }}>
                <Paper>
                    <Box sx={{ m: 2 }}>
                        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                            Signup
                        </Typography>
                        <p>Please enter your City, State/Territory, Country, or City, State/Territory, or City, Country to calculate an accurate    geolocation.</p>
                        <p>Name, email, username, and password are all required to create an account.</p>
                        <SignupForm setToken={setToken} />
                    </Box>
                    <img src="/images/profile_plants.png" width='100%' alt='Succulent Terrariums on Profile Page' />
                </Paper>
            </Box>
        </Container>
    );
}

export default Signup;
