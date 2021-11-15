import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditPlantForm from './EditPlantForm';

const EditPlant = ({close, handleEdit, lightsources, plant}) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Plant
                    </Typography>
                    <p>All fields required.</p>
                   <EditPlantForm close={close} handleEdit={handleEdit} lightsources={lightsources} plant={plant} />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditPlant;