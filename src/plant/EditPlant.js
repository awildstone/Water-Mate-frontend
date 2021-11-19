import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PlantForm from './PlantForm';

const EditPlant = ({close, setEditPlant, lightSources, plant}) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Plant
                    </Typography>
                    <p>All fields required.</p>
                <PlantForm 
                    close={close}
                    setEditPlant={setEditPlant} 
                    lightSources={lightSources} 
                    plant={plant} 
                />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditPlant;