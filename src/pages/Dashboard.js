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
import { getCollections, deleteCollection } from '../collection/useCollections';


const Dashboard = ({ collections, handleCollectionRequest }) => {
        
    const [isLoading, setIsLoading] = useState(true);
    const [collection, setCollection] = useState(null);
    const [addCollection, setAddCollection] = useState(false);

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
    };

    /** Set the current collection (if any) in state. */
    useEffect(() => {
        if (collections) setCollection(collections.collections[0]);
        setIsLoading(false);
    },[collections, handleCollectionRequest, addCollection]);

    /** Handles action to open a form modal. */
    const handleOpen = (action) => {
        map[action](true);
    } 

    /** Handles action to close a form modal. */
    const handleClose = (action) => {
        map[action](false);
        handleCollectionRequest(getCollections());
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
            <Collection
                collections={collections}
                handleCollectionRequest={handleCollectionRequest}
                getCollections={getCollections}
                deleteCollection={deleteCollection}
                userCollectionCount={collections.collections.length}
                collection={collection}
                setCollection={setCollection}
            />
        );
    }

    if (isLoading || !collections) {
        return <Loading />
    } else if (collections.collections.length > 0) {
        return hasCollections();
    } else {
        return noCollections();
    }
}

export default Dashboard;