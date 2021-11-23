import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';
import Fab from '@mui/material/Fab';
import Collection from '../collection/Collection';
import AddCollection from '../collection/AddCollection';
import AddRoom from '../room/AddRoom';
import Loading from '../alerts/Loading';
import { getCollections, deleteCollection } from '../collection/useCollections';
import useRooms from '../room/useRooms';
import { getRooms } from '../room/useRooms';


const Dashboard = ({ collections, handleCollectionRequest }) => {

    const [ error, rooms, setRooms, handleRoomRequest ] = useRooms();    
    const [isLoading, setIsLoading] = useState(true);
    const [collection, setCollection] = useState(null);
    const [addCollection, setAddCollection] = useState(false);
    const [addRoom, setaddRoom] = useState(false);
    const [filterRoom, setFilterRoom] = useState(null);
    const [viewCollection, setViewCollection] = useState(null);
    const openRoomMenu = Boolean(filterRoom);
    const openCollectionMenu = Boolean(viewCollection);

    /** Styling for Modals. */
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    /** Mapping of actions and state setters. */
    const map = {
        'add-collection': setAddCollection,
        'add-room': setaddRoom,
    };

    /** Set the current collection (if any) in state. */
    useEffect(() => {
        if (collections) {
            setCollection(collections.collections[0]);
            if (collections.collections.length) handleRoomRequest(getRooms({ 'collection_id': collections.collections[0].id }));
        } else {
            handleCollectionRequest(getCollections());
        }
        setIsLoading(false);
    },[collections, addCollection]);

    /** Filters the collection rooms by room_id. */
    const filterByRoom = (event, data) => {
        const split = event.target.innerText.split(' ');
        const len = split.length;
        const id = split[len-1].toString();
        const filtered = data.rooms.filter((room) => room.id === +id);
        setRooms({ rooms: filtered });
    };

    /** Handles the opening of filter room menu. */
    const handleClickRoomMenu = (event) => {
        setFilterRoom(event.currentTarget);
    };

    /** Handles the opening of filter collection menu. */
    const handleClickCollectionMenu = (event) => {
        setViewCollection(event.currentTarget);
    }

    /** Handles closing filter menus & captures the selection by the user. */
    const handleCloseMenu = (event, criteria, data) => {
        if (criteria === 'collection') {
            setCollection(data);
            handleRoomRequest(getRooms({ 'collection_id': data.id }));
            setViewCollection(null);
        } else if (criteria === 'room') {
            filterByRoom(event, data);
            setFilterRoom(null);
        } else if (criteria === 'filter') {
            handleRoomRequest(getRooms({ 'collection_id': collection.id }));
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
        if (action === 'add-collection') handleCollectionRequest(getCollections());
        if (action === 'add-room') {
            setCollection(collection);
            handleRoomRequest(getRooms({ 'collection_id': collection.id }));
        }
    }

    /** Returns instructions and form for user to add their first Collection. */
    const noCollections = () => {
        return (
            <Container maxWidth="lg"> 
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
                                        Add your Collection
                                    </Typography>
                                    <p>To get started, add the name of your Collection.</p> 
                                    <p>Your Collection name can be anything you like - some suggestions: "Home", "Office", or "My Plant Collection".</p> 
                                    <p>It helps if your collection name represents where it is located if you want to add multiple collections.</p>
                                    <Tooltip title="Add Collection">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            color="secondary"
                                            onClick={() => handleOpen('add-collection')}
                                            aria-label="add" 
                                        >
                                            <AddCircleRoundedIcon sx={{ color: '#fff' }} />
                                                Collection
                                        </Button>
                                    </Tooltip>

                                    <Modal
                                            open={addCollection}
                                            onClose={() => handleClose('add-collection')}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={modalStyle}>
                                                <AddCollection close={handleClose} />
                                            </Box>
                                        </Modal>

                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
            </Container>  
        );
    }

    /** Returns a Collection component. */
    const hasCollections = () => {
        return (
            <Container maxWidth="lg">
                <Box sx={{  '& > :not(style)': { m: 2, p: 2 } }}>
                    <Paper>
                        <Grid
                            container
                            mb={4}
                            direction='row'
                            justifyContent='space-evenly'
                            rowSpacing={3} 
                            columnSpacing={3}
                            textAlign='center'
                        >
                            <Grid item>
                                <Tooltip title="Add Collection">
                                    <Fab 
                                        onClick={() => handleOpen('add-collection')}
                                        variant="extended" 
                                        color="secondary"
                                    >
                                        <AddCircleRoundedIcon sx={{ mr: 1 }} />
                                        Collection
                                    </Fab>
                                </Tooltip>
                            </Grid>

                            <Modal
                                open={addCollection}
                                onClose={() => setAddCollection(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={modalStyle}>
                                    <AddCollection 
                                        close={handleClose}
                                        setAddCollection={setAddCollection} 
                                    />
                                </Box>
                            </Modal>

                            {/* If there is more than 1 collection display the collection toggle menu button. */}
                            { collections.collections.length > 1 ?
                                <>
                                    <Grid item>
                                        <Tooltip title="View Other Collections">
                                            <Fab 
                                                onClick={handleClickCollectionMenu}
                                                variant="extended" 
                                                color="secondary"
                                            >
                                                <VisibilityRoundedIcon sx={{ mr: 1 }} />
                                                Collections
                                            </Fab>
                                        </Tooltip>
                                    </Grid>

                                    <Menu
                                        id="filter-collections"
                                        anchorEl={viewCollection}
                                        open={openCollectionMenu}
                                        onClose={() => setViewCollection(null)}
                                        MenuListProps={{'aria-labelledby': 'filter-collections-menu',}}
                                    >
                                        <MenuList>
                                              { collections.collections.map((collection, i) => {
                                                return (
                                                    <MenuItem 
                                                        key={i+1} 
                                                        onClick={(e) => handleCloseMenu(e, 'collection', collection)}
                                                    >
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
                                :
                                ''
                            }

                            {/* If there is a collection in state, show button to add a room to the collection. */}
                            { collection ?
                                <>
                                    <Grid item>
                                        <Tooltip title="Add Room">
                                            <Fab
                                                onClick={() => handleOpen('add-room')}
                                                variant="extended" 
                                                color="secondary"
                                            >
                                                <AddCircleRoundedIcon sx={{ mr: 1 }} />
                                                Room
                                            </Fab>
                                        </Tooltip>
                                    </Grid>

                                    <Modal
                                        open={addRoom}
                                        onClose={() => setaddRoom(false)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={modalStyle}>
                                            <AddRoom 
                                                close={handleClose} 
                                                setaddRoom={setaddRoom} 
                                                collectionId={collection.id} 
                                            />
                                        </Box>
                                    </Modal>
                                </>
                                :
                                ''
                            }

                            {/* If there are rooms, show room filter menu. */}
                            { rooms ?
                                <>
                                    <Grid item>
                                        <Tooltip title="Filter by Room">
                                            <Fab 
                                                onClick={handleClickRoomMenu}
                                                variant="extended" 
                                                color="secondary"
                                            >
                                                <ArrowDropDownIcon sx={{ mr: 1 }} />
                                                Room <FilterListRoundedIcon />
                                            </Fab>
                                        </Tooltip>
                            
                                        <Menu
                                            id="filter-room-menu"
                                            anchorEl={filterRoom}
                                            open={openRoomMenu}
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
                                                  {/* Render room name & id in the room filter dropdown menu. */}
                                                  { rooms ?
                                                    rooms.rooms.map((room, i) => {
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
                                    </Grid>
                                </>
                                :
                                ''
                            }
                        </Grid>

                        <Collection
                            handleCollectionRequest={handleCollectionRequest}
                            getCollections={getCollections}
                            deleteCollection={deleteCollection}
                            collection={collection}
                            setCollection={setCollection}
                            rooms={rooms}
                            handleRoomRequest={handleRoomRequest}
                        />
                    </Paper>
                </Box>
            </Container>
        );
    }

    if (isLoading || !collections ) {
        return <Loading />
    } else if (collections.collections.length > 0) {
        return hasCollections();
    } else {
        return noCollections();
    }
}

export default Dashboard;
