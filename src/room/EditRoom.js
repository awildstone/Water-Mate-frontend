import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditRoomForm from '../forms/EditRoomForm';

const EditRoom = ({ close, handleEdit, room }) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Room
                    </Typography>
                    <p>All fields required.</p>
                   <EditRoomForm close={close} handleEdit={handleEdit} room={room} />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditRoom;