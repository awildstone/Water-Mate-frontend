import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import UserContext from '../context/UserContext';

const DesktopNav = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const noAuth = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link underline="none" color={'#fff'} component={NavLink} to="/">Water Mate</Link>
            </Typography>
            <Button component={NavLink} to="/about" color="inherit">About</Button>
            <Button component={NavLink} to="/login" color="inherit">Login</Button>
            <Button component={NavLink} to="/signup" color="inherit">Signup</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

  const auth = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link underline="none" color={'#fff'} component={NavLink} to="/">Water Mate</Link>
            </Typography>
            <Button component={NavLink} to="/about" color="inherit">About</Button>
            <Button component={NavLink} to="/get-started" color="inherit">Get Started</Button>
            <Button component={NavLink} to="/dashboard" color="inherit">Dashboard</Button>
            <Button component={NavLink} to="/water-manager" color="inherit">Water Manager</Button>
            <Button component={NavLink} to="/profile" color="inherit">Profile</Button>
            <Button component={NavLink} to="/" color="inherit" onClick={logout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

  if (currentUser) {
    return auth();
  } else {
    return noAuth();
  }
}

export default DesktopNav;
