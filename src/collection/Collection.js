import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Room from '../room/Room';
import EditCollection from '../collection/EditCollection';
import WarningModal from '../alerts/WarningModal';
import Loading from '../alerts/Loading';
import { getRooms, deleteRoom } from '../room/useRooms';

const Collection = ({ 
    handleCollectionRequest, 
    getCollections, 
    deleteCollection, 
    collection,
    setCollection, 
    rooms,
    handleRoomRequest }) => {

    const [editCollection, setEditCollection] = useState(false);
    const [deleteCollectionToggle, setDeleteCollectionToggle] = useState(false);

    /** Styling for modals. */
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    /** Mapped list of actions and setters for toggling modal open/closed state. */
    const map = {
        'edit-collection': setEditCollection,
        'delete-collection': setDeleteCollectionToggle
    };

    /** Get a color for a room. 
     * Recycles through 4 colors, assigning each room a color in the same order. */
    let colors = ['#ffecc1', '#BEDABA', '#ffe7e0', '#E1F6F6'];
    const getColor = () => {
        if (colors.length === 0) colors = ['#ffecc1', '#BEDABA', '#ffe7e0', '#E1F6F6'];
        const color = colors.shift();
        return color;
    }
    
    /** Handles action to open a form modal. */
    const handleOpen = (action) => {
        map[action](true);
    } 

    /** Handles action to close a form modal. */
    const handleClose = (action, data=null) => {
        map[action](false);
        if (action === 'edit-collection') {
            setCollection(data);
        }
        if (action === 'delete-collection') handleCollectionRequest(getCollections());
    }

    if (collection && rooms) {
        return (
            <>
                <Grid 
                    container
                    direction='row'
                    rowSpacing={3} 
                    columnSpacing={3}
                    textAlign='center'
                >
                    <Grid item md={12} >
                        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                            {collection.name}
                            <Tooltip title="Edit Collection">
                                <IconButton 
                                    onClick={() => handleOpen('edit-collection')}
                                    aria-label="edit" 
                                    color="secondary"
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                            </Tooltip>
                            <Modal
                                open={editCollection}
                                onClose={() => setEditCollection(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={modalStyle}>
                                    <EditCollection 
                                        close={handleClose} 
                                        setEditCollection={setEditCollection} 
                                        collection={collection} 
                                    />
                                </Box>
                            </Modal>
                            <Tooltip title="Delete Collection">
                                <IconButton 
                                    onClick={() => handleOpen('delete-collection') }
                                    aria-label="delete"
                                    color="secondary"
                                >
                                    <DeleteForeverRoundedIcon />
                                </IconButton>
                            </Tooltip>
                            <WarningModal
                                title='Delete Collection'
                                type='Collection'
                                action='delete-collection'
                                open={deleteCollectionToggle}
                                close={setDeleteCollectionToggle}
                                handleClose={handleClose}
                                handleDelete={handleCollectionRequest}
                                request={deleteCollection}
                                id={collection.id}
                            />
                        </Typography>
                    </Grid>
                      
                </Grid>
                <Divider />
                <Box 
                    textAlign='center' 
                    sx={{ marginTop: '2px'}}
                >
                    <img src="/images/hanging_terrariums.png" height='200px' alt='Hanging succulent terrariuglobes' />
                </Box>
                <Grid 
                    container 
                    direction='row' 
                    justifyContent='space-between' 
                    alignItems='stretch'
                >
                    {/* If the collection has rooms, render them. Otherwise render a message instructing the user to add Rooms to their collection. */}
                    { rooms.rooms.length ?
                        rooms.rooms.map((room, i) => {
                            return (
                                <Grid key={room.id} item sm={12} md={6} sx={{ display: 'flex', alignItems:'stretch',    width: '100%' }} >
                                    <Room
                                        handleRoomRequest={handleRoomRequest}
                                        getRooms={getRooms}
                                        deleteRoom={deleteRoom}
                                        color={getColor()}
                                        room={room}
                                    />
                                </Grid>
                            )})
                        :
                        <Box textAlign='center'>
                            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>No Rooms!</Typography>
                                <p>Add a room to your Collection. You can name your room anything you like but it helps if your room describes the location.</p>
                                <p>Examples: Kitchen, Bedroom, Bathroom, etc.</p>
                        </Box>
                    }
                </Grid>
            </>
        );
    }
    return <Loading />
};

export default Collection;