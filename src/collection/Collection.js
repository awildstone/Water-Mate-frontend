import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Room from '../room/Room';
import EditCollection from '../collection/EditCollection';
import AddCollection from '../collection/AddCollection';
import AddRoom from '../room/AddRoom';
import WarningModal from '../alerts/WarningModal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Loading from '../alerts/Loading';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ListItemText from '@mui/material/ListItemText';
import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';


const Collection = ({ collections, userCollectionCount, collection, setCollection, handleAdd, handleEdit, handleDelete, handleRequest, getRooms, getPlants }) => {
    const [rooms, setRooms] = useState([]);
    const [addCollection, setAddCollection] = useState(false);
    const [editCollection, setEditCollection] = useState(false);
    const [addRoom, setaddRoom] = useState(false);
    const [deleteCollection, setDeleteCollection] = useState(false);
    const [filterRoom, setFilterRoom] = useState(null);
    const [filterCollection, setFilterCollection] = useState(null);
    const open = Boolean(filterRoom);
    const openCollection = Boolean(filterCollection)

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const map = {
        'add-collection': setAddCollection,
        'edit-collection': setEditCollection,
        'add-room': setaddRoom,
        'delete-collection': setDeleteCollection
    };

    const colors = {
        1: '#ffecc1',
        2: '#BEDABA',
        3: '#ffe7e0',
        4: '#b5f7ff',
        5: '#ffecc1',
        6: '#BEDABA',
        7: '#ffe7e0',
        8: '#b5f7ff',
        9: '#ffecc1',
        10: '#BEDABA',
        11: '#ffe7e0',
        12: '#b5f7ff',
    }

    /** Get rooms for the current collection (if any). */
    useEffect(() => {
        getRoomsData(collection);
    },[collection, addCollection, addRoom]);

    /** Get all rooms by collection_id. */
    async function getRoomsData(collection) {
        const rooms = await getRooms({ 'collection_id': collection.id });
        if (rooms) setRooms(rooms);
    }

    /** Filters the collection rooms by room_id. */
    const filterByRoom = (event, data) => {
        const split = event.target.innerText.split(' ');
        const len = split.length;
        const id = split[len-1].toString();
        const filtered = data.filter((room) => room.id === +id);
        setRooms(filtered);
    };

    /** Handles the opening of filter room menu. */
    const handleClickRoomMenu = (event) => {
        setFilterRoom(event.currentTarget);
    };

    /** Handles the opening of filter collection menu. */
    const handleClickCollectionMenu = (event) => {
        setFilterCollection(event.currentTarget);
    }

    /** Handles the closing the filter room menu & captures the selection by the user to view all rooms or filter by a room. */
    const handleCloseMenu = (event, criteria, data) => {
        if (criteria === 'collection') {
            setCollection(data);
            setFilterCollection(null);
        } else if (criteria === 'room') {
            filterByRoom(event, data);
            setFilterRoom(null);
        } else if (criteria === 'filter') {
            getRoomsData(collection);
            setFilterRoom(null);
        }
    };
    
    /** Handles action to open a form modal. */
    const handleOpen = (action) => {
        map[action](true);
    } 

    /** Handles action to close a form modal. */
    const handleClose = (action) => {
        map[action](false);
    }

    if (collections && userCollectionCount) {

    return (
        <Container key={collection.id} maxWidth="lg"> 
            <Box sx={{  '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
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
                                <Tooltip title="Delete Collection">
                                    <IconButton 
                                        onClick={() => handleOpen('delete-collection') }
                                        aria-label="delete"
                                        color="secondary"
                                    >
                                        <DeleteForeverRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Typography>
                        </Grid>

                        <WarningModal
                            title='Delete Collection'
                            type='Collection'
                            action='delete-collection'
                            open={deleteCollection}
                            handleClose={handleClose}
                            handleDelete={handleDelete}
                            resource={'collection'}
                            id={collection.id}
                        />

                        <Modal
                            open={editCollection}
                            onClose={() => handleClose('edit-collection')}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <EditCollection close={handleClose} handleEdit={handleEdit} collection={collection} />
                            </Box>
                        </Modal>

                        <Modal
                            open={addRoom}
                            onClose={() => handleClose('add-room')}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <AddRoom 
                                    close={handleClose} 
                                    collectionId={collection.id} 
                                    handleAdd={handleAdd}
                                    handleRequest={handleRequest}
                                />
                            </Box>
                        </Modal>

                        <Grid item xs={12} >
                            <Paper sx={{ backgroundColor: '#243246' }}>
                                <Tooltip title="Add Collection">
                                    <Button 
                                        size='small'
                                        startIcon={<AddRoundedIcon />}
                                        onClick={() => handleOpen('add-collection')}
                                        aria-label="add" 
                                        sx={{ color: '#fff' }}
                                    >
                                        Collection
                                    </Button>
                                </Tooltip>
                            { userCollectionCount > 1 ?
                                <>
                                    <Tooltip title="View Other Collections">
                                        <Button
                                            size='small'
                                            id="filter-collections"
                                            aria-controls="filter-collections"
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClickCollectionMenu} 
                                            aria-label="filter-collections" 
                                            sx=  {{ color: '#fff' }} 
                                            startIcon={<VisibilityRoundedIcon />}
                                        >
                                            Collections
                                        </Button>
                                    </Tooltip>
                                    <Menu
                                        id="filter-collections"
                                        anchorEl={filterCollection}
                                        open={openCollection}
                                        onClose={() => setFilterCollection(null)}
                                        MenuListProps={{'aria-labelledby': 'filter-collections-menu',}}
                                    >
                                        <MenuList>
                                              { collections.map((collection, i) => {
                                                return (
                                                    <MenuItem key={i+1} onClick={(e) => handleCloseMenu(e, 'collection', collection)}>
                                                        <ListItemIcon>
                                                            <CollectionsRoundedIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {collection.name}
                                                        </ListItemText>
                                                    </MenuItem>
                                                    )})
                                            }
                                        </MenuList>
                                    </Menu>
                                    </>
                                : ''
                            }
                                <Tooltip title="Add Room">
                                    <Button
                                        size='small'
                                        startIcon={<AddRoundedIcon />}
                                        onClick={() => handleOpen('add-room')}
                                        aria-label="add" 
                                        sx={{ color: '#fff' }}
                                    >
                                        Room
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Filter by Room">
                                    <Button
                                        size='small'
                                        id="filter-button"
                                        aria-controls="filter-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClickRoomMenu} 
                                        aria-label="filter" 
                                        sx=  {{ color: '#fff' }} 
                                        startIcon={<ArrowDropDownIcon />}
                                    >
                                        Room <FilterListRoundedIcon />
                                    </Button>
                                </Tooltip>
                                <Menu
                                    id="filter-room-menu"
                                    anchorEl={filterRoom}
                                    open={open}
                                    onClose={() => setFilterRoom(null)}
                                    MenuListProps={{'aria-labelledby': 'filter-room-button',}}
                                >
                                    <MenuList>
                                          <MenuItem onClick={(e) => handleCloseMenu(e, 'filter', rooms)}>
                                            <ListItemIcon>
                                              <GridViewRoundedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Show All</ListItemText>
                                          </MenuItem>
                                          { rooms.length ?
                                            rooms.map((room, i) => {
                                            return (
                                                <MenuItem key={i+1} onClick={(e) => handleCloseMenu(e, 'room', rooms)}>
                                                    <ListItemIcon>
                                                        <BedroomChildRoundedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        {room.name} <span style={{color: '#fff'}}>{room.id}</span>
                                                    </ListItemText>
                                                </MenuItem>
                                            )})
                                            :
                                            ''
                                        }
                                    </MenuList>
                                </Menu>
                            </Paper>
                        </Grid>
                    </Grid>
                                                
                    <Modal
                        open={addCollection}
                        onClose={() => handleClose('add-collection')}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <AddCollection close={handleClose} handleAdd={handleAdd} handleRequest={handleRequest}/>
                        </Box>
                    </Modal>
                                                
                                                
                    <Box 
                        textAlign='center' 
                        sx={{ marginTop: '2px'}}
                    >
                        <img src="/images/hanging_terrariums.png" height='200px' alt='Hanging succulent terrarium globes' />
                    </Box>
                                                
                    <Grid 
                        container 
                        direction='row' 
                        justifyContent='space-between' 
                        alignItems='stretch'
                    >
                        { rooms.length ?
                            rooms.map((room, i) => {
                                return (
                                    <Grid key={room.id} item sm={12} md={6} sx={{ display: 'flex', alignItems:'stretch', width: '100%' }} >
                                        <Room
                                            collection={collection}
                                            handleRequest={handleRequest}
                                            getRoomsData={getRoomsData}
                                            getPlants={getPlants}
                                            handleAdd={handleAdd} 
                                            handleEdit={handleEdit} 
                                            handleDelete={handleDelete} 
                                            sx={{ height: '100%'}} 
                                            color={colors[i+1] }  
                                            room={room} 
                                        />
                                    </Grid>
                                )})
                                    
                            :
                            <Box textAlign='center'>
                                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>No Rooms!</Typography>
                                    <p>Add a room to your Collection.</p>
                                    <p>You can name your room anything you like but it helps if your room name isdescriptive like: Kitchen, Bedroom, Bathroom, etc.</p>
                            </Box>
                        }
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
    }
        return <Loading />
};

export default Collection;