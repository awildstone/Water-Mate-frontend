import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RoomForm from './RoomForm';

const EditRoom = ({ close, setEditRoom, room }) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Room
                    </Typography>
                    <p>All fields required.</p>
                   <RoomForm close={close} setEditRoom={setEditRoom} room={room} />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditRoom;