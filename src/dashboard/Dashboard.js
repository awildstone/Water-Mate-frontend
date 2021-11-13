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
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
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
import Paginator from '../Paginator';


const Dashboard = ({ handleRequest, userCollectionCount, getCollections, getRooms, getPlants, handleAdd, handleEdit, handleDelete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [ collection, setCollection ] = useState(null);
    const [ rooms, setRooms ] = useState([]);

    const [addCollection, setAddCollection] = useState(false);
    const [editCollection, setEditCollection] = useState(false);
    const [addRoom, setaddRoom] = useState(false);
    const [deleteCollection, setDeleteCollection] = useState(false);
    const [filterRoom, setFilterRoom] = useState(null);
    const open = Boolean(filterRoom);

    const [itemsPerPage, setItemsPerPage] = useState(null);
    const [count, setCount] = useState(null);
    const [page, setPage] = useState(1);

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

    /** Handles updating the current page in pagination. */
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        getCollectionsData();
    },[page, addCollection, editCollection, deleteCollection, addRoom]);

    const filterByRoom = (event, data) => {
        const split = event.target.innerText.split(' ');
        const len = split.length;
        const id = split[len-1].toString();
        const filtered = data.filter((room) => room.id === +id);
        setRooms(filtered);
    };

    async function loadRoomsData(currentCollection) {
        const rooms = await getRooms({ 'collection_id': currentCollection.id });
        if (rooms) setRooms(rooms)
    }
    
    async function getCollectionsData() {
        let collectionsData = await getCollections(page);
        console.log(collectionsData);
        if (collectionsData) {
            setCollection(collectionsData.collections[0]);
            setItemsPerPage(collectionsData.itemsPerPage);
            setCount(collectionsData.count);
            if (collectionsData.collections[0]) loadRoomsData(collectionsData.collections[0]);
            setIsLoading(false);
        }
    }
    
    const handleClickMenu = (event) => {
        setFilterRoom(event.currentTarget);
    };

    const handleCloseMenu = (event, criteria, data) => {
        if (criteria === 'room') {
            filterByRoom(event, data);
        } else {
            loadRoomsData(collection);
        }
        setFilterRoom(null);
      };

    const handleOpen = (action) => {
        map[action](true);
    } 

    const handleClose = (action) => {
        if (action === 'delete-collection') setPage(page - 1);
        map[action](false);
    }

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
                                                <AddCollection handleRequest={handleRequest} close={handleClose} handleAdd={handleAdd} />
                                            </Box>
                                        </Modal>

                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
            </Container>  
        );
    }

    const hasCollections = () => {
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
                                        <Tooltip title="Filter Plants by Room">
                                            <Button
                                                size='small'
                                                id="filter-button"
                                                aria-controls="filter-menu"
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClickMenu} 
                                                aria-label="filter" 
                                                sx=  {{ color: '#fff' }} 
                                                startIcon={<ArrowDropDownIcon />}
                                            >
                                                Room
                                            </Button>
                                        </Tooltip>
                                        <Menu
                                            d="filter-menu"
                                            anchorEl={filterRoom}
                                            open={open}
                                            onClose={(e) => handleCloseMenu(e, 'filter', rooms)}
                                            MenuListProps={{'aria-labelledby': 'filter-button',}}
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
                                                )
                                                })
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
                                    <AddCollection close={handleClose} handleAdd={handleAdd} />
                                </Box>
                            </Modal>
                                                
                                                
                            <Box 
                                textAlign='center' 
                                sx={{ marginTop: '2px'}}>
                                    <img 
                                        src="/images/hanging_terrariums.png"
                                        height='200px' 
                                        alt='Hanging succulent terrarium globes' />
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
                                        <Grid key={room.id} item sm={12} md={6} sx={{ display: 'flex', alignItems: 'stretch', width: '100%' }} >
                                            <Room
                                                collection={collection}
                                                loadRoomsData={loadRoomsData}
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
                                        <p>You can name your room anything you like but it helps if your room name is descriptive like: Kitchen, Bedroom, Bathroom, etc.</p>
                                </Box>
                            }
                        </Grid>
                        <Grid container sx={{ flexGrow: 1, '& > :not(style)': { m: 1 } }} justifyContent="center">
                            <Grid item xs={12} textAlign="center">
                                <Typography variant="h5" component="div">
                                    {count > 1 ? 'View More Collections' : ''}
                                </Typography>
                            </Grid>
                            <Tooltip title="View Collections">
                                <Grid item>
                                    <Paginator
                                        itemsPerPage={itemsPerPage}
                                        currentPage={page}
                                        pageCount={Math.ceil(count / itemsPerPage)}
                                        handlePageChange={handlePageChange}
                                    />
                                </Grid>
                            </Tooltip>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        )
    }

    if (isLoading || !collection || !rooms) {
        return <Loading />
    } else if (userCollectionCount > 0) {
        return hasCollections();
    } else {
        return noCollections();
    }
}

export default Dashboard;