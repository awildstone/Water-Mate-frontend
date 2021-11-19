import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Modal from '@mui/material/Modal';
import EditRoom from '../room/EditRoom';
import AddLightSource from '../lightsource/AddLightSource';
import AddPlant from '../plant/AddPlant';
import WarningModal from '../alerts/WarningModal';
import usePlants, { getPlants } from '../plant/usePlants';
import Loading from '../alerts/Loading';

const Room = ({ 
    handleRoomRequest, 
    deleteRoom, 
    getRooms, 
    color, 
    room, 
    handleAdd, 
    handleDelete }) => {
        
    const [error, plants, setPlants, handlePlantRequest] = usePlants();
    const [lights, setLights] = useState([]);
    const [editRoom, setEditRoom] = useState(false);
    const [addLight, setAddLight] = useState(false);
    const [addPlant, setAddPlant] = useState(false);
    const [deleteRoomToggle, setDeleteRoomToggle] = useState(false);
    const [deleteLight, setDeleteLight] = useState(false);

    /** Styling for modals. */
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    /** Mapped list of actions and setters for toggling modal open/closed state. */
    let map = {
        'edit-room': setEditRoom,
        'add-plant': setAddPlant,
        'add-light': setAddLight,
        'delete-room': setDeleteRoomToggle,
        'delete-light': setDeleteLight
    };

    /** Get plants for the room (if any) */
    useEffect(() => {
        setLights(room.lightsources);
        handlePlantRequest(getPlants({ 'room_id': room.id }));
    },[room]);

    /** Handles action to open a form modal. */
    const handleOpen = (action) => {
        map[action](true);
    } 

    /** Handles action to close a form modal. */
    const handleClose = (action) => {
        map[action](false);
        handleRoomRequest(getRooms({ 'collection_id': room.collection_id }));
    }

    if (room && plants && lights) {
        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper elevation={3} sx={{ backgroundColor: color }}> 
                    <Grid 
                        key={room.id} 
                        container 
                        direction='row' 
                        spacing={1} 
                        alignItems="stretch" 
                        justifyContent="space-evenly"
                    >
                        <Grid item md={12} component='div'>
                            <List>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                                            {room.name}
                                            <Tooltip title="Edit Room">
                                                <IconButton 
                                                    onClick={() => handleOpen('edit-room')} 
                                                    aria-label="edit" 
                                                    color="secondary"
                                                >
                                                    <EditRoundedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Room">
                                                <IconButton 
                                                    onClick={() => handleOpen('delete-room')} 
                                                    aria-label="delete" 
                                                    color="secondary"
                                                >
                                                    <DeleteForeverRoundedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                <Modal
                                    open={editRoom}
                                    onClose={() => setEditRoom(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={modalStyle}>
                                        <EditRoom close={handleClose} setEditRoom={setEditRoom} room={room} />
                                    </Box>
                                </Modal>
                                <WarningModal
                                    title='Delete Room'
                                    type='Room'
                                    action='delete-room'
                                    open={deleteRoomToggle}
                                    close={setDeleteRoomToggle}
                                    handleClose={handleClose}
                                    handleDelete={handleRoomRequest}
                                    request={deleteRoom}
                                    resource={'room'}
                                    id={room.id}
                                />
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                            Lightsources
                                            <Tooltip title="Add Light Sources">
                                                <IconButton 
                                                    onClick={() => handleOpen('add-light')} 
                                                    aria-label="add" 
                                                    color="secondary"
                                                >
                                                    <AddCircleRoundedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Divider />
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                <Modal
                                    open={addLight}
                                    onClose={() => setAddLight(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={modalStyle}>
                                        <AddLightSource 
                                            close={handleClose}
                                            setAddLight={setAddLight} 
                                            handleAdd={handleAdd} 
                                            roomId={room.id} 
                                            current={lights} 
                                        />
                                    </Box>
                                </Modal>
                                { room.lightsources.length ?
                                    room.lightsources.map((light) => {
                                        return (
                                            <ListItem key={light.id}>
                                                <Tooltip title="Remove Light Source">
                                                    <IconButton 
                                                        onClick={() => handleOpen('delete-light')} 
                                                        aria-label={light.type}
                                                        color="secondary" 
                                                        size="small">
                                                        <LightModeRoundedIcon />
                                                        {light.type}
                                                        <DeleteForeverRoundedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <WarningModal
                                                    title='Remove Lightsource'
                                                    type='Lightsource'
                                                    action='delete-light'
                                                    open={deleteLight}
                                                    close={setDeleteLight}
                                                    handleClose={handleClose}
                                                    handleDelete={handleDelete}
                                                    resource={'light'}
                                                    id={light.id}
                                                />
                                            </ListItem>
                                        )}) 
                                    :
                                    ''
                                }
                            </List>
                        </Grid>
                    { room.lightsources.length ?
                        <Grid item md={12}>
                            <List>
                                <ListItem>
                                    <ListItemText>
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                            Plants
                                            <Tooltip title="Add Plants">
                                                <IconButton 
                                                    onClick={() => handleOpen('add-plant')} 
                                                    aria-label="add" 
                                                    color="secondary"
                                                >
                                                    <AddCircleRoundedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Divider />
                                        </Typography>
                                        <Modal
                                            open={addPlant}
                                            onClose={() => setAddPlant(false)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={modalStyle}>
                                                <AddPlant 
                                                    close={handleClose}
                                                    setAddPlant={setAddPlant}
                                                    roomId={room.id} 
                                                    lightSources={lights} 
                                                />
                                            </Box>
                                        </Modal>
                                    </ListItemText>
                                </ListItem>
                                { plants.plants.map((plant) => {
                                    return (
                                        <ListItem key={plant.id}>
                                            <ListItemAvatar>
                                                <Tooltip title="View Plant Details">
                                                    <Link 
                                                        underline="none" 
                                                        color="secondary" 
                                                        component={NavLink} 
                                                        to={`/plant/${plant.id}`}
                                                    >
                                                        <Avatar alt={plant.name} src={plant.image}/>
                                                    </Link>
                                                </Tooltip>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                <Tooltip title="View Plant Details">
                                                    <Link 
                                                        underline="none" 
                                                        color="secondary" 
                                                        component={NavLink} 
                                                        to={`/plant/${plant.id}`}
                                                    >
                                                        {plant.name}
                                                    </Link>
                                                </Tooltip>
                                            </ListItemText>
                                        </ListItem>
                                    );
                                }) }
                            </List>
                        </Grid>
                    :
                        <ListItem>
                            <ListItemText>
                                <Typography component="div" sx={{ flexGrow: 1 }}>
                                    Add lightsources to your room, then add your plants!
                                </Typography>
                            </ListItemText>
                        </ListItem>

                    }
                    </Grid>
                </Paper>
            </Box>
        );
    }
    return <Loading />
}

export default Room;