import { useState, useEffect, useContext, useCallback } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Modal from '@mui/material/Modal';
import EditRoom from '../room/EditRoom';
import AddLightSource from '../lightsource/AddLightSource';
import AddPlant from '../plant/AddPlant';
import WarningModal from '../alerts/WarningModal';
import usePlants, { getPlants } from '../plant/usePlants';
import LoadingRoom from '../alerts/LoadingRoom';
import Paginator from '../Paginator';
import LightSourceItem from '../lightsource/LightSourceItem';
import PlantItem from '../plant/PlantItem';
import UserContext from '../context/UserContext';

const Room = ({ handleRoomRequest, deleteRoom, getRooms, color, room }) => {
    
    const [error, plants, setPlants, handlePlantRequest] = usePlants();
    const { token } = useContext(UserContext);
    const [lights, setLights] = useState([]);
    const [editRoom, setEditRoom] = useState(false);
    const [addLight, setAddLight] = useState(false);
    const [addPlant, setAddPlant] = useState(false);
    const [deleteRoomToggle, setDeleteRoomToggle] = useState(false);
    const [deleteLight, setDeleteLight] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(null);

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

    /** Load plant data and set the pagination data in state. */
    const loadPlantsData = useCallback(async () => {
        const { data } = await handlePlantRequest(getPlants(token, page, { 'room_id': room.id }));
        if (data) {
            setItemsPerPage(data.itemsPerPage);
            setCount(data.count);
        }
    }, [token, page, room, handlePlantRequest]);

    /** Get plants for the room (if any) */
    useEffect(() => {
        setLights(room.lightsources);
        loadPlantsData();
    },[token, page, room, loadPlantsData]);

    /** Handles action to open a form modal. */
    const handleOpen = (action) => {
        map[action](true);
    } 

    /** Handles action to close a form modal. */
    const handleClose = (action) => {
        map[action](false);
        handleRoomRequest(getRooms(token, { 'collection_id': room.collection_id }));
    }

    /** Handles updating the plants list pagination. */
    const handlePageChange = (event, value) => {
        setPage(value);
    };

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

                                            <Tooltip title="Delete Room">
                                                <IconButton 
                                                    onClick={() => handleOpen('delete-room')} 
                                                    aria-label="delete" 
                                                    color="secondary"
                                                >
                                                    <DeleteForeverRoundedIcon />
                                                </IconButton>
                                            </Tooltip>

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
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                              
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
                                                        roomId={room.id} 
                                                        current={lights} 
                                                    />
                                                </Box>
                                            </Modal>

                                            <Divider />
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                               
                                {/* If there are lightsources render them. */}
                                { room.lightsources.length ?
                                    room.lightsources.map((light) => {
                                        return (
                                            <LightSourceItem
                                                key={light.id}
                                                light={light}
                                                handleOpen={handleOpen}
                                                deleteLight={deleteLight}
                                                setDeleteLight={setDeleteLight}
                                                handleClose={handleClose}
                                            />
                                        )}) 
                                    :
                                    ''
                                }
                            </List>
                        </Grid>

                      {/* If there are lightsources, check for plants and render them (or display the button to add a plant), else display a message instructing user to add lightsources. */}
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
                                    </ListItemText>

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

                                </ListItem>
                                </List>

                                <List>
                                {/* If there are plants render them. */}
                                { plants.plants.map((plant) => {
                                    return (
                                        <PlantItem key={plant.id} plant={plant} />
                                    );
                                }) 
                                }

                                {/* If there are more than 5 plants per room, display the plant pagination buttons. */}
                                { count > itemsPerPage ?
                                    <ListItem>
                                        <Paginator
                                            title={'More Plants'}
                                            itemsPerPage={itemsPerPage}
                                            currentPage={page}
                                            pageCount={Math.ceil(count / itemsPerPage)}
                                            handlePageChange={handlePageChange}
                                            size={"small"}
                                        />
                                    </ListItem>
                                :
                                    ''
                                }
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
    return <LoadingRoom />
}

export default Room;
