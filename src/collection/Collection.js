import React, { useState, useContext } from 'react';
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
import { getRooms, deleteRoom } from '../room/useRooms';
import LoadingCollection from '../alerts/LoadingCollection';
import { getCollections, deleteCollection } from './useCollections';
import UserContext from '../context/UserContext';
import { modalStyle, isValid } from '../utils';

const Collection = ({
    handleCollectionRequest,
    collection,
    rooms,
    handleRoomRequest }) => {

    const { token, refreshToken, getAuthToken } = useContext(UserContext);
    const [editCollection, setEditCollection] = useState(false);
    const [deleteCollectionToggle, setDeleteCollectionToggle] = useState(false);

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
    const handleClose = (action, data = null) => {
        if (!isValid(token)) {
            getAuthToken(refreshToken);
        }
        map[action](false);
        handleCollectionRequest(getCollections(token));
        // if (action === 'edit-collection') {
        //     handleCollectionRequest(getCollections(token));
        //     setCollection(data);
        // }
        // if (action === 'delete-collection') handleCollectionRequest(getCollections(token));
    }

    if (collection && rooms && token && refreshToken) {
        return (
            <>
                <Grid
                    container
                    direction='row'
                    rowSpacing={3}
                    columnSpacing={3}
                    textAlign='center'
                >
                    <Grid item xs={12} mb={2} >
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
                                        collectionData={collection}
                                    />
                                </Box>
                            </Modal>
                            <Tooltip title="Delete Collection">
                                <IconButton
                                    onClick={() => handleOpen('delete-collection')}
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
                    sx={{ marginTop: '2px' }}
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
                    {rooms.rooms.length ?
                        rooms.rooms.map((room, i) => {
                            return (
                                <Grid
                                    key={room.id}
                                    item
                                    xs={12}
                                    md={6}
                                    sx={{ display: 'flex', alignItems: 'stretch', width: '100%' }}
                                >
                                    <Room
                                        handleRoomRequest={handleRoomRequest}
                                        getRooms={getRooms}
                                        deleteRoom={deleteRoom}
                                        color={getColor()}
                                        room={room}
                                    />
                                </Grid>
                            )
                        })
                        :
                        <Grid
                            item
                            xs={12}
                            alignContent='center'
                        >
                            <Box textAlign='center'>
                                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>No Rooms!</Typography>
                                <Typography>
                                    <p>
                                        Add a room to your Collection. You can name your room anything you like but it helps if your room describes the location.
                                    </p>
                                    <p>
                                        Examples: Kitchen, Bedroom, Bathroom, etc.
                                    </p>
                                </Typography>
                            </Box>
                        </Grid>
                    }
                </Grid>
            </>
        );
    }
    return <LoadingCollection />
};

export default Collection;
