import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditPlantRoomForm from './EditPlantRoomForm';

const EditPlantRoom = ({ close, setEditPlantRoom, lightSources, plant, rooms }) => {
    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Move Rooms
                    </Typography>
                    <Typography>
                        <p>
                            All fields required.
                        </p>
                    </Typography>
                    <EditPlantRoomForm
                        close={close}
                        setEditPlantRoom={setEditPlantRoom}
                        plant={plant}
                        rooms={rooms}
                    />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditPlantRoom;