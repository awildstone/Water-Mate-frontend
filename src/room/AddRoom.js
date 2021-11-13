import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddRoomForm from '../forms/AddRoomForm';

const AddRoom = ({ close, collectionId, handleAdd }) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Add Room
                    </Typography>
                    <p>All fields required.</p>
                   <AddRoomForm close={close} collectionId={collectionId} handleAdd={handleAdd} />
                </Paper>
            </Box>
        </Container>
    );
}

export default AddRoom;