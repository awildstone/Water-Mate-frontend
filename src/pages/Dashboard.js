import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Collection from '../collection/Collection';
import AddCollection from '../collection/AddCollection';
import Loading from '../alerts/Loading';


const Dashboard = ({ collections, getCollections, handleRequest, userCollectionCount, getRooms, getPlants, handleAdd, handleEdit, handleDelete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [ collection, setCollection ] = useState([]);
    const [addCollection, setAddCollection] = useState(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const map = {
        'add-collection': setAddCollection,
    };

    useEffect(() => {
        if (collections) setCollection(collections[0]);
        setIsLoading(false);
    },[collections, addCollection]);


    const handleOpen = (action) => {
        map[action](true);
    } 

    const handleClose = (action) => {
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
                                                <AddCollection close={handleClose} handleAdd={handleAdd} handleRequest={handleRequest} />
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
            <Collection
                collections={collections}
                getCollections={getCollections}
                userCollectionCount={userCollectionCount}
                collection={collection}
                setCollection={setCollection}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleRequest={handleRequest}
                getRooms={getRooms}
                getPlants={getPlants}
            />
        );
    }

    if (isLoading || !collections || !collection) {
        return <Loading />
    } else if (userCollectionCount > 0) {
        return hasCollections();
    } else {
        return noCollections();
    }
}

export default Dashboard;