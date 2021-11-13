import { useContext } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import UserContext from '../context/UserContext';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const Landing = () => {
    const { currentUser } = useContext(UserContext);
    
    const auth = () => {
        return (
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', '& > :not(style)': { m: 2, p: 2 } }}>
                    <Paper>
                        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                            Water Mate
                        </Typography>
                        <p>Visit the <Link underline="none" color={'#1CBC9B'} component={NavLink} to="/get-started">Getting Started</Link> page to learn how to use this app.</p>
                        <p>Visit the <Link underline="none" color={'#1CBC9B'} component={NavLink} to="/water-manager">Water Manager</Link> to water your plants, or your <Link underline="none" color={'#1CBC9B'} component={NavLink} to="/dashboard">Dashboard</Link> to manage your Collection(s).</p>
                        <img className="rounded" src='/images/water_mate.png' alt="Water Mate" width="100%" />
                    </Paper>
                </Box>
            </Container>
        );
    }

    const noAuth = () => {
        return (
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', '& > :not(style)': { m: 2, p: 2 } }}>
                    <Paper>
                        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                            Water Mate
                        </Typography>
                        <p>Read <Link underline="none" color={'#1CBC9B'} component={NavLink} to="/about">about</Link> this app.</p>
                        <p><Link underline="none" color={'#1CBC9B'} component={NavLink} to="/signup">Create</Link> an account or <Link underline="none" color={'#1CBC9B'} component={NavLink} to="/login">Login</Link>.</p>
                        <img className="rounded" src='/images/water_mate.png' alt="Water Mate" width="100%" />
                    </Paper>
                </Box>
            </Container>
        );
    }

    if (currentUser) {
        return auth();
    } else {
        return noAuth();
    }
}

export default Landing;