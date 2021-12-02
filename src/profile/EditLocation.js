import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';
import LocationForm from './LocationForm';

const EditLocation = ({close, setEditLocation, user}) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Location
                    </Typography>
                    <Typography>
                        <p>
                            <WarningIcon sx={{ color: red[500] }} /> WARNING! this will change how Water Mate calculates the water schedule for all of your plants.
                        </p>
                        <p>To get and accurate geoloction, city and country are required.</p>
                    </Typography>
                   <LocationForm close={close} setEditLocation={setEditLocation} user={user} />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditLocation;
