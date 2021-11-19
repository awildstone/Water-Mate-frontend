import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import WaterScheduleForm from './WaterScheduleForm';
import { red } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';


const EditWaterSchedule = ({close, handleEdit, plant}) => {
    return(
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                        Edit Water Schedule
                    </Typography>
                    <p><WarningIcon sx={{ color: red[500] }} /> By enabling Manual Mode, the Wate Mate will only remind you to water on the interval of days you specify below and will never change the water interval until updated or manual mode disabled.</p>
                
                    <p>If you want the schedule to adjust automatically for seasonal changes make sure manual mode is unchecked when you update changes.</p>
                   <WaterScheduleForm close={close} handleEdit={handleEdit} plant={plant} />
                </Paper>
            </Box>
        </Container>
    );
}

export default EditWaterSchedule;