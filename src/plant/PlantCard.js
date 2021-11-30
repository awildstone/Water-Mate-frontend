import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import SnoozeIcon from '@mui/icons-material/Snooze';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import NotesForm from '../forms/NotesForm';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import moment from 'moment';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import SpeakerNotesOffRoundedIcon from '@mui/icons-material/SpeakerNotesOffRounded';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import useSchedule, { waterPlant, snoozePlant } from '../schedule/useSchedule';
import UserContext from '../context/UserContext';
import { isValid } from '../utils';

const PlantCard = ({ plant, waterSchedule, loadPlantsToWater }) => {
    const { token, refreshToken, getAuthToken } = useContext(UserContext);
    const [ error, message, setMessage, handleScheduleRequest ] = useSchedule();
    const [ showForm, setShowForm ] = useState(false);
    const [ notes, setNotes ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    /** Updates a Plant's schedule based on the type of action (Water/Snooze).
     * Confirms there is a fresh auth token in state before updating the schedule resource.
     */
    const updatePlantSchedule = async (action, schedule_id) => {
      setIsLoading(true);
      
      if (!isValid(token)) {
        getAuthToken(refreshToken);
      } else { 
        if (action === 'water') {
          await handleScheduleRequest(waterPlant(token, schedule_id, notes));
        }
        if (action === 'snooze') {
          await handleScheduleRequest(snoozePlant(token, schedule_id, notes));
        }
        loadPlantsToWater();
      }
      setIsLoading(false);
    }

    return (
        <Card sx={{ width: '100%' }}>
          <CardMedia
            component="img"
            height="200px"
            image={plant.image}
            alt={plant.name}
          />
          <CardContent>
            <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
              <Link underline="none" color={'#212121'} component={NavLink} to={`/plant/${plant.id}`}>{plant.name}</Link>
            </Typography>
            <Typography sx={{ textAlign: 'center' }} gutterBottom component="div">
              Last Water Date: {moment(waterSchedule.water_date).format('MM/DD/YYYY')}
            </Typography>
            <Box sx={{ display: showForm ? true : 'none' }}>
                <NotesForm 
                  setNotes={setNotes}
                  notes={notes} 
                  setShowForm={setShowForm} 
                  showForm={showForm} />
            </Box>
            <div>
              { error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : '' }
            </div>
          </CardContent>
          <CardActions>
            <Box sx={{ margin: 'auto'}}>
                <Stack direction="row" justifyContent="center" alignItems="flex-end" spacing={2}>
                  { !isLoading ?
                    <>
                      <Tooltip title="Water Plant">
                        <Fab 
                          onClick={() => updatePlantSchedule('water', waterSchedule.id)} 
                          size="small" 
                          color="secondary" 
                          aria-label="Water Plant"
                        >
                          <InvertColorsIcon />
                        </Fab>
                      </Tooltip>

                      <Tooltip title={showForm ? "Hide Notes" : "Add Notes"}>
                        <Fab 
                          size="small" 
                          color="secondary" 
                          aria-label="Notes" 
                          onClick={() => setShowForm(!showForm)}
                        >
                          {showForm ? <SpeakerNotesOffRoundedIcon /> : <CommentRoundedIcon />}
                        </Fab>
                      </Tooltip>

                      <Tooltip title="Snooze Plant">
                      <Fab 
                        onClick={() => updatePlantSchedule('snooze', waterSchedule.id)} 
                        size="small" 
                        color="secondary"
                        aria-label="Snooze Plant"
                      >
                        <SnoozeIcon />
                        </Fab>
                      </Tooltip>
                    </>
                    :
                      <LoadingButton
                          loading
                          size="large"
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="outlined"
                      >
                        Updating
                      </LoadingButton>
                  }

                </Stack>
            </Box>
          </CardActions>
        </Card>
    );
}

export default PlantCard;
