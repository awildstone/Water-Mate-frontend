import { useContext } from 'react';
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import OpacityIcon from '@mui/icons-material/Opacity';
import InfoIcon from '@mui/icons-material/Info';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import UserContext from '../context/UserContext';

const MobileNav = ({logout}) => {
    const { currentUser } = useContext(UserContext);
    const [openDrawer, setOpenDrawer] = useState(false);

    const noAuth = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="fixed" color="secondary">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setOpenDrawer(!openDrawer)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <Link underline="none" color={'#fff'} component={NavLink} to="/">Water Mate</Link>
                  </Typography>
                  <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                      <List>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                  <Link underline="none" color={'#212121'} component={NavLink} to="/">
                                    Water Mate
                                  </Link>
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText>
                              <Link underline="none" color={'#212121'} component={NavLink} to="/about">
                                About
                              </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText>
                              <Link underline="none" color={'#212121'} component={NavLink} to="/login">
                                Login
                              </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText>
                              <Link underline="none" color={'#212121'} component={NavLink} to="/signup">
                                Signup
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <CancelIcon color="secondary" fontSize="large" />
                        </ListItem>
                      </List>
                  </Drawer>
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
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setOpenDrawer(!openDrawer)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <Link underline="none" color={'#fff'} component={NavLink} to="/">Water Mate</Link>
                  </Typography>
                  <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                      <List>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                  <Link underline="none" color={'#212121'} component={NavLink} to="/">
                                    Water Mate
                                  </Link>
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon><InfoIcon /></ListItemIcon>
                            <ListItemText>
                              <Link underline="none" color={'#212121'} component={NavLink} to="/about">
                                About
                              </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                            <ListItemText>
                              <Link underline="none" color={'#212121'} component={NavLink} to="/get-started">
                                Get Started
                              </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon><DashboardCustomizeIcon /></ListItemIcon>
                            <ListItemText>
                              <Link underline="none" color={'#212121'} component={NavLink} to="/dashboard">
                                Dashboard
                              </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon><OpacityIcon /></ListItemIcon>
                            <ListItemText>
                              <Link underline="none" color={'#212121'} component={NavLink} to="/water-manager">
                                Water Manager
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText>
                              <Link underline="none" color={'#212121'} component={NavLink} to="/profile">
                                Profile
                              </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={logout}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText>
                              <Link underline="none" color={'#212121'} component={NavLink} to="/">
                                Logout
                              </Link>
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => setOpenDrawer(false)}>
                            <CancelIcon color="secondary" fontSize="large" />
                        </ListItem>
                      </List>
                  </Drawer>
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

export default MobileNav;
