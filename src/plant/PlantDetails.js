import { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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
import CollectionsIcon from '@mui/icons-material/Collections';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import EditIcon from '@mui/icons-material/Edit';
import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';
import Fab from '@mui/material/Fab';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import PanToolRoundedIcon from '@mui/icons-material/PanToolRounded';
import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import Tooltip from '@mui/material/Tooltip';
import { Avatar } from '@mui/material';
import Modal from '@mui/material/Modal';
import EditPlant from './EditPlant';
import EditWaterSchedule from '../schedule/EditWaterSchedule';
import PlantWaterHistory from './PlantWaterHistory';
import EditPlantRoom from './EditPlantRoom';
import WarningModal from '../alerts/WarningModal';
import PlantContext from '../context/PlantContext';
import UserContext from '../context/UserContext';
import Loading from '../alerts/Loading';
import moment from 'moment';
import usePlants, { getPlant, deletePlant } from './usePlants';
import { modalStyle, isValid } from '../utils';
import { waterPlant } from '../schedule/useSchedule';

const PlantDetails = ({ collections }) => {
    const { id } = useParams();
    const { token, refreshToken, getAuthToken } = useContext(UserContext);
    const { plantTypes } = useContext(PlantContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, plants, setPlants, handlePlantRequest] = usePlants();
    const [plantType, setPlantType] = useState(null);
    const [light, setLight] = useState(null);
    const [collection, setCollection] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [editPlantRoom, setEditPlantRoom] = useState(null);
    const [editPlant, setEditPlant] = useState(false);
    const [editSchedule, setEditSchedule] = useState(false);
    const [viewHistory, setViewHistory] = useState(false);
    const [deletePlantToggle, setDeletePlantToggle] = useState(false);

    /** Handle calling the API to water the plant now
     * This should be refactored into a hook.
     */
    const handleScheduleRequest = async ({ url, method, data = {}, token }) => {
        const headers = { 'content-type': 'application/json', 'x-access-token': token };
        setIsLoading(true);
        try {
            await axios({ url, method, data, headers });
            getPlantData();
        } catch (err) {
            const message = err.response.data.msg;
        }
        setIsLoading(false);
    }


    /** Mapped list of actions and setters for toggling modal open/closed state. */
    let map = {
        'edit-plant': setEditPlant,
        'edit-plant-room': setEditPlantRoom,
        'edit-schedule': setEditSchedule,
        'view-history': setViewHistory,
        'delete-plant': setDeletePlantToggle
    };

    /** Gets current plant data and uses current plant data to set light, plantType and collection state.
     * Confirms a fresh auth token is in state before attempting to load the plant resource data.
     */
    const getPlantData = useCallback(async () => {
        if (!isValid(token)) {
            getAuthToken(refreshToken);
        } else {
            let { data } = await handlePlantRequest(getPlant(token, id));
            if (data) {
                //set plant light type
                setLight(data.plant.room.lightsources);
                //set plant type
                const type = plantTypes.filter(type => type.id === data.plant.type_id);
                setPlantType(type[0]);
                //set plant collection
                const collection_id = data.plant.room.collection_id;
                const collection = collections.collections.filter(collection => collection.id === collection_id);
                setCollection(collection[0]);
                //set collection rooms
                setRooms(collection[0].rooms)
            }
        }
    }, [token, refreshToken, getAuthToken, collections, handlePlantRequest, id, plantTypes]);

    /** Water a plant now & update the plant's schedule */
    const waterPlantNow = async () => {
        if (!isValid(token)) {
            getAuthToken(refreshToken);
        } else {
            await handleScheduleRequest(waterPlant(token, plants.plant.water_schedule[0].id, ''));
        }
    }

    /** Get & Set plant data in state. */
    useEffect(() => {
        if (id && plantTypes && collections) getPlantData();
        setIsLoading(false);
    }, [id, plantTypes, collections, getPlantData]);

    /** Handles action to open a form modal.
     * Confirms there is a fresh auth token in state before loading form.
     */
    const handleOpen = (action) => {
        if (!isValid(token)) {
            getAuthToken(refreshToken);
        }
        map[action](true);
    }

    /** Handles action to close a form modal.
     * Confirms there is a fresh auth token in state before loading updated resources.
     */
    const handleClose = (action) => {
        if (!isValid(token)) {
            getAuthToken(refreshToken);
        }
        map[action](false);
        getPlantData();
    }

    if (!isLoading && plants && plantType && collection && token && refreshToken) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', '& > :not(style)': { m: 2, p: 2 } }}>
                    <Paper>
                        <Grid container direction='row' spacing={2} alignItems="stretch">
                            <Grid item md={12}>
                                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                                    {plants.plant.name}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <List>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                                Plant Details
                                                <Divider />
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><LocalFloristRoundedIcon /></ListItemIcon>
                                        <ListItemText>
                                            Type: {plantType.name}
                                            <Tooltip title="Water now">
                                                <Fab
                                                    onClick={() => waterPlantNow()}
                                                    size="small"
                                                    variant="extended"
                                                    color="secondary"
                                                    sx={{ ml: 2 }}
                                                >
                                                    <InvertColorsIcon />
                                                    Water
                                                </Fab>
                                            </Tooltip>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><CollectionsIcon /></ListItemIcon>
                                        <ListItemText>
                                            Collection: {collection.name}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><BedroomChildIcon /></ListItemIcon>
                                        <ListItemText>
                                            Room: {plants.plant.room.name}
                                            <Tooltip title="Move Rooms">
                                                <Fab
                                                    onClick={() => handleOpen('edit-plant-room')}
                                                    size="small"
                                                    variant="extended"
                                                    color="secondary"
                                                    sx={{ ml: 2 }}
                                                >
                                                    <EditRoundedIcon sx={{ mr: 1 }} />
                                                    <BedroomChildRoundedIcon />
                                                </Fab>
                                            </Tooltip>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><LightModeRoundedIcon /></ListItemIcon>
                                        <ListItemText>
                                            Lightsource: {plants.plant.light.type}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <Stack direction="row" spacing={2} >
                                            <Tooltip title="Edit Plant Details">
                                                <Button
                                                    onClick={() => handleOpen('edit-plant')}
                                                    sx={{ color: '#fff' }}
                                                    startIcon={<EditIcon />}
                                                    color="secondary"
                                                    variant="contained">
                                                    Plant
                                                </Button>
                                            </Tooltip>

                                            <Modal
                                                open={editPlant}
                                                onClose={() => handleClose('edit-plant')}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={modalStyle}>
                                                    <EditPlant
                                                        close={handleClose}
                                                        setEditPlant={setEditPlant}
                                                        lightSources={light}
                                                        plant={plants.plant}
                                                    />
                                                </Box>
                                            </Modal>

                                            <Modal
                                                open={editPlantRoom}
                                                onClose={() => handleClose('edit-plant-room')}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={modalStyle}>
                                                    <EditPlantRoom
                                                        close={handleClose}
                                                        setEditPlantRoom={setEditPlantRoom}
                                                        plant={plants.plant}
                                                        rooms={rooms}
                                                    />
                                                </Box>
                                            </Modal>

                                            <Tooltip title="Delete Plant">
                                                <Button
                                                    onClick={() => handleOpen('delete-plant')}
                                                    sx={{ color: '#fff' }}
                                                    startIcon={<DeleteForeverIcon />}
                                                    color="error"
                                                    variant="contained">
                                                    Plant
                                                </Button>
                                            </Tooltip>

                                            <WarningModal
                                                title='Delete Plant'
                                                type='Plant'
                                                action='delete-plant'
                                                open={deletePlantToggle}
                                                close={setDeletePlantToggle}
                                                handleClose={handleClose}
                                                handleDelete={handlePlantRequest}
                                                request={deletePlant}
                                                resource={'plant'}
                                                id={plants.plant.id}
                                                redirect={'/dashboard/'}
                                            />

                                        </Stack>
                                    </ListItem>
                                </List>
                            </Grid>

                            <Grid item md={6}>
                                <List>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                                Water History
                                                <Divider />
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><EventAvailableRoundedIcon /></ListItemIcon>
                                        <ListItemText>
                                            Last Water Date: {moment(plants.plant.water_schedule[0].water_date).format('MM/DD/YYYY')}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><EventAvailableRoundedIcon /></ListItemIcon>
                                        <ListItemText>
                                            Next Water Date: {moment(plants.plant.water_schedule[0].next_water_date).format('MM/DD/YYYY')}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><EventAvailableRoundedIcon /></ListItemIcon>
                                        <ListItemText>
                                            Water Interval: {plants.plant.water_schedule[0].water_interval} Days
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><PanToolRoundedIcon /></ListItemIcon>
                                        <ListItemText>
                                            Manual Mode Enabled? {plants.plant.water_schedule[0].manual_mode.toString()}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <Stack direction="row" spacing={2} >
                                            <Tooltip title="View Water History Table">
                                                <Button
                                                    onClick={() => handleOpen('view-history')}
                                                    sx={{ color: '#fff' }}
                                                    startIcon={<RemoveRedEyeRoundedIcon />} color="secondary"
                                                    variant="contained">
                                                    History
                                                </Button>
                                            </Tooltip>

                                            <Modal
                                                open={viewHistory}
                                                onClose={() => handleClose('view-history')}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={modalStyle}>
                                                    <PlantWaterHistory
                                                        close={handleClose}
                                                        plant={plants.plant}
                                                    />
                                                </Box>
                                            </Modal>

                                            <Tooltip title="Edit Water Schedule">
                                                <Button
                                                    onClick={() => handleOpen('edit-schedule')}
                                                    sx={{ color: '#fff' }}
                                                    startIcon={<EditIcon />}
                                                    color="secondary"
                                                    variant="contained">
                                                    Schedule
                                                </Button>
                                            </Tooltip>

                                            <Modal
                                                open={editSchedule}
                                                onClose={() => setEditSchedule(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={modalStyle}>
                                                    <EditWaterSchedule
                                                        close={handleClose}
                                                        setEditSchedule={setEditSchedule}
                                                        schedule={plants.plant.water_schedule[0]}
                                                    />
                                                </Box>
                                            </Modal>

                                        </Stack>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item md={12} display='flex' justifyContent='center' alignItems='center'>
                                <Avatar
                                    alt="Plant Name"
                                    src={plants.plant.image}
                                    sx={{ height: '400px', width: '400px' }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        )
    }
    return <Loading />
}

export default PlantDetails;
