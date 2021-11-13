import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';
import EditLocationForm from '../forms/EditLocationForm';

const EditLocation = ({close, handleEdit, user}) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Location
                    </Typography>
                    <p><WarningIcon sx={{ color: red[500] }} /> WARNING! this will change how Water Mate calculates the water schedule for all of your plants.</p>
                   <EditLocationForm close={close} handleEdit={handleEdit} user={user} />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditLocation;