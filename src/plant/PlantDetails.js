import { useState, useContext, useEffect } from 'react';
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import PanToolRoundedIcon from '@mui/icons-material/PanToolRounded';
import LocalFloristRoundedIcon from '@mui/icons-material/LocalFloristRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import Tooltip from '@mui/material/Tooltip';
import { Avatar } from '@mui/material';
import Modal from '@mui/material/Modal';
import EditPlant from './EditPlant';
import EditWaterSchedule from './EditWaterSchedule';
import PlantWaterHistory from './PlantWaterHistory';
import WarningModal from '../alerts/WarningModal';
import UserContext from '../context/UserContext';
import PlantContext from '../context/PlantContext';
import Loading from '../alerts/Loading';
import moment from 'moment';

const PlantDetails = ({ getPlant, collections, handleEdit, handleDelete, getHistory }) => {
    const { id } = useParams();
    const { currentUser } = useContext(UserContext);
    const { plantTypes } = useContext(PlantContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ plant, setPlant ] = useState(null);
    const [ plantType, setPlantType ] = useState(null);
    const [ collection, setCollection ] = useState(null);
    const [ editPlant, setEditPlant ] = useState(false);
    const [ editSchedule, setEditSchedule ] = useState(false);
    const [ viewHistory, setViewHistory ] = useState(false);
    const [ deletePlant, setDeletePlant ] = useState(false);

    async function getPlantData() {
        const plantData = await getPlant(id);
        if (plantData) {
           setPlant(plantData);
           const type = plantTypes.filter(type => type.id === plantData.type_id);
           if (type) setPlantType(type[0]);
           const collection_id = plantData.room.collection_id;
           const collection = collections.filter(collection => collection.id === collection_id);
           if (collection) setCollection(collection[0]);
        } 
    }

    useEffect(() => {
        if (currentUser && plantTypes && collections) getPlantData();
        setIsLoading(false); 
    },[currentUser, plantTypes, collections]);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const handleOpen = (action) => {
        let map = {
            'edit-plant': setEditPlant,
            'edit-schedule': setEditSchedule,
            'view-history': setViewHistory,
            'delete-plant': setDeletePlant
        };

        map[action](true);
    } 

    const handleClose = (action) => {
         let map = {
            'edit-plant': setEditPlant,
            'edit-schedule': setEditSchedule,
            'view-history': setViewHistory,
            'delete-plant': setDeletePlant
        };

        map[action](false);
    }

    if (!isLoading && plant && plantType && collection) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', '& > :not(style)': { m: 2, p: 2 } }}>
                    <Paper>
                    { plant ?
                        <Grid container direction='row' spacing={2} alignItems="stretch">
                            <Grid item md={12}>
                                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                                    {plant.name}
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
                                                Room: {plant.room.name}
                                            </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                            <ListItemIcon><LightModeRoundedIcon /></ListItemIcon>
                                            <ListItemText>
                                                Lightsource: {plant.light.type}
                                            </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <Stack direction="row" spacing={2} >
                                            <Tooltip title="Edit Plant Details">
                                            <Button 
                                                onClick={() => handleOpen('edit-plant')} 
                                                sx={{ color: '#fff'}} 
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
                                                        handleEdit={handleEdit} 
                                                        lightsources={plant.room.lightsources}
                                                        plant={plant} 
                                                    />
                                                </Box>
                                            </Modal>

                                            <Tooltip title="Delete Plant">
                                            <Button
                                                onClick={() => handleOpen('delete-plant')}
                                                sx={{ color: '#fff'}} 
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
                                                open={deletePlant}
                                                handleClose={handleClose}
                                                handleDelete={handleDelete}
                                                resource={'plant'}
                                                id={plant.id}
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
                                            Last Water Date: {moment(plant.water_schedule[0].water_date).format('MM/DD/YYYY')}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><EventAvailableRoundedIcon /></ListItemIcon>
                                        <ListItemText>
                                            Next Water Date: {moment(plant.water_schedule[0].next_water_date).format('MM/DD/YYYY')}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><EventAvailableRoundedIcon /></ListItemIcon>
                                        <ListItemText>
                                            Water Interval: {plant.water_schedule[0].water_interval} Days
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><PanToolRoundedIcon /></ListItemIcon>
                                        <ListItemText>
                                            Manual Mode Enabled? {plant.water_schedule[0].manual_mode.toString()}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <Stack direction="row" spacing={2} >
                                            <Tooltip title="View Water History Table">
                                            <Button 
                                                onClick={() => handleOpen('view-history')} 
                                                sx={{ color: '#fff'}} 
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
                                                        data={plant.water_schedule[0].water_history} 
                                                        plant={plant}
                                                        getHistory={getHistory} 
                                                    />
                                                </Box>
                                            </Modal>

                                            <Tooltip title="Edit Water Schedule">
                                            <Button 
                                                onClick={() => handleOpen('edit-schedule')} 
                                                sx={{ color: '#fff'}} 
                                                startIcon={<EditIcon />} 
                                                color="secondary" 
                                                variant="contained">
                                                Schedule
                                            </Button>
                                            </Tooltip>

                                            <Modal
                                                open={editSchedule}
                                                onClose={() => handleClose('edit-schedule')}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={modalStyle}>
                                                    <EditWaterSchedule close={handleClose} handleEdit={handleEdit} plant={plant} />
                                                </Box>
                                            </Modal>

                                        </Stack>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item md={12} display='flex' justifyContent='center' alignItems='center'>
                                <Avatar 
                                    alt="Plant Name"
                                    src={plant.image}
                                    sx={{ height: '400px', width: '400px'}}
                                />
                            </Grid>
                        </Grid>
                        :
                        <Grid container direction='row' spacing={2} alignItems="stretch">
                            <Grid item md={12}>
                                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                                    Unauthorized.
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                    </Paper>
                </Box>
            </Container>
        )
    }
    return <Loading />
}

export default PlantDetails;