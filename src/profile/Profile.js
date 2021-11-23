import { useState, useContext } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import EditIcon from '@mui/icons-material/Edit';
import CollectionsIcon from '@mui/icons-material/Collections';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import EditProfile from './EditProfile';
import EditPassword from './EditPassword';
import EditLocation from './EditLocation';
import WarningModal from '../alerts/WarningModal';
import UserContext from '../context/UserContext';
import Loading from '../alerts/Loading';
import useProfile, { deleteAccount } from './useProfile';


const Profile = ({ collections }) => {
    const { currentUser, loadUserData } = useContext(UserContext);
    const [error, message, setMessage, handleProfileRequest] = useProfile();
    const [ editProfile, setEditProfile ] = useState(false);
    const [ editPassword, setEditPassword ] = useState(false);
    const [ editLocation, setEditLocation ] = useState(false);
    const [ deleteAccountToggle, setDeleteAccountToggle ] = useState(false);
    
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    let map = {
        'edit-profile': setEditProfile,
        'edit-password': setEditPassword,
        'edit-location': setEditLocation,
        'delete-account': setDeleteAccountToggle
    };

    const handleOpen = (action) => {
        map[action](true);
    } 

    const handleClose = (action) => {
        map[action](false);
        loadUserData();
    }

    if (currentUser && collections) {
        return (
            <Container maxWidth='lg'>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { mt: 2, p: 0} }}>
                    <Paper>
                        <Typography variant="h2" component="div" sx={{ flexGrow: 1, textAlign: 'center', m: 2 }}>
                            {currentUser.name}
                        </Typography>
                        <img src="/images/profile_plants.png" width='100%' alt='Succulent Terrariums on Profile Page' />
                        <List sx={{ m: 2 }} >
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Profile
                                        <Divider />
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText>
                                    {currentUser.name}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><AlternateEmailIcon /></ListItemIcon>
                                <ListItemText>
                                    {currentUser.username}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><AttachEmailIcon /></ListItemIcon>
                                <ListItemText>
                                    {currentUser.email}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Stack direction="row" spacing={2}>
                                    <Tooltip title="Edit Profile">
                                    <Button 
                                        onClick={() => handleOpen('edit-profile')} 
                                        sx={{ color: '#fff'}} 
                                        startIcon={<EditIcon />} 
                                        color="secondary" 
                                        variant="contained" 
                                        size="small">
                                        Profile
                                    </Button>
                                    </Tooltip>
        
                                    <Modal
                                        open={editProfile}
                                        onClose={() => setEditProfile(false)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={modalStyle}>
                                            <EditProfile 
                                                close={handleClose}
                                                setEditProfile={setEditProfile}
                                                user={currentUser} 
                                            />
                                        </Box>
                                    </Modal>
        
                                    <Tooltip title="Edit Password">
                                    <Button 
                                        onClick={() => handleOpen('edit-password')} 
                                        sx={{ color: '#fff'}} 
                                        startIcon={<EditIcon />} 
                                        color="secondary" 
                                        variant="contained" 
                                        size="small">
                                        Password
                                    </Button>
                                    </Tooltip>
        
                                    <Modal
                                        open={editPassword}
                                        onClose={() => handleClose('edit-password')}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={modalStyle}>
                                            <EditPassword 
                                                close={handleClose}
                                                setEditPassword={setEditPassword}
                                                user={currentUser}
                                            />
                                        </Box>
                                    </Modal>
        
                                </Stack>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Location
                                        <Divider />
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><PersonPinCircleIcon /></ListItemIcon>
                                <ListItemText>
                                    Latitude: {currentUser.latitude}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><PersonPinCircleIcon /></ListItemIcon>
                                <ListItemText>
                                    Longitude: {currentUser.longitude}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Tooltip title="Edit Location">
                                <Button 
                                    onClick={() => handleOpen('edit-location')} 
                                    sx={{ color: '#fff'}} 
                                    startIcon={<EditIcon />} 
                                    color="secondary" 
                                    variant="contained" 
                                    size="small">
                                    Location
                                </Button>
                                </Tooltip>
        
                                <Modal
                                    open={editLocation}
                                    onClose={() => handleClose('edit-location')}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={modalStyle}>
                                        <EditLocation 
                                            close={handleClose}
                                            setEditLocation={setEditLocation}  
                                            user={currentUser} 
                                        />
                                    </Box>
                                </Modal>
        
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                        Collection(s)
                                        <Divider />
                                    </Typography>
                                </ListItemText>
                            </ListItem>
        
                            { collections.collections.map((collection) => {
                                return (
                                    <ListItem key={collection.id}>
                                        <ListItemIcon><CollectionsIcon /></ListItemIcon>
                                        <ListItemText>
                                            {collection.name} 
                                        </ListItemText>
                                    </ListItem>
                                )
                            })}
    
                            <ListItem>
                                <Tooltip title="Delete Account">
                                <Button
                                    onClick={() => handleOpen('delete-account')} 
                                    startIcon={<DeleteForeverIcon />} 
                                    color="error" 
                                    variant="contained" 
                                    size="small">
                                    Account
                                </Button>
                                </Tooltip>
                        
                                <WarningModal
                                    title='Delete Account'
                                    type='Account'
                                    action='delete-account'
                                    open={deleteAccountToggle}
                                    close={setDeleteAccountToggle}
                                    handleClose={handleClose}
                                    handleDelete={handleProfileRequest}
                                    request={deleteAccount}
                                    id={currentUser.id}
                                    redirect={'/'}
                                />
    
                            </ListItem>
                          </List>
                    </Paper>
                </Box>
            </Container>
        );
    }
    return <Loading />
}

export default Profile;
