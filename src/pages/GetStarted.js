import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GetStarted = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>Getting Started</Typography>
                        <img className="rounded" src='/images/plants.png' alt="Water Mate" height="300px" />
                    </Box>
                    
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>How to use Water Mate</Typography>

                    <p>Water Mate is a tool to help you organize your plant collection, keep track of the health of your plants, and help remind you when it's time to water your plants. You have full control over how your collection is organized, so organize your collection in a way that makes sense for you!</p>

                    <p>Water Mate calculates a watering schedule for each of your plants using your location, the type of plant, and the type of lightsource your plant has access to in your home. Its up to you to identify what kind of plant you have, and make sure you have the appropriate environment for your plant - if you aren't sure what your plant needs you should research this before using this app. If you love the plant but, don't have the optimal conditions, Water Mate will adjust the watering schedule for your plant to help.</p>

                    <p>Remember to always check your plant's soil moisture before you water your plant! As a general rule of thumb, most plants need good drainage, and need soil to dry out to some degree between watering to prevent root rot. If the soil is still wet use the snooze feature and check again in a few days.</p>

                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Setup your Collection</Typography>

                    <List>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>1. Add your Collection(s).</Typography>
                                Visit your Dashboard to add your Collection. You can add multiple Collections if you are managing more than one collection.
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>2. Add your Room(s).</Typography>
                                Once your Collection is created, add a Room to your collection from the Dashboard. You can add as many Rooms as you need!
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>3. Add your Lightsource(s).</Typography>
                                Once a room is created, you can add the Lightsources that are available in that room from the Dashboard. The add Light Source form allows you to add or remove as many lights to a room as needed!
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>4. Add your Plant(s).</Typography>
                                Add your Plants to the Room! Its reccommended that you upload a photo of your plant to help you remember which one it is, or you can choose a unique name for your plant such as the specific species name or the plant's given name. Choose the type of plant carefully, and choose the Lightsource the plant is using.
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>5. Water your Plant(s).</Typography>
                                Finally, make sure that you water your plant the same day you added it to the schedule.
                            </ListItemText>
                        </ListItem>
                    </List>

                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Using the Water Manager</Typography>

                    <p>The Water Manager is your task view for watering your plants, snoozing the plant water schedule, and adding notes about the event (if applicable). Plants that are ready for care will appear in this view and remain in the view until they are Watered or Snoozed.</p>

                    <p>Adding notes to your water event is helpful for tracking details such as the overal health of the plant during this check, or any other notes (such as pest prevention treatment or fertilization). Notes added will be available to view in the plant's water history view.</p>

                    <p>Clicking Water will update the plant's water schedule, generate a solar forcast using the water calculation algorithm and set the next water date in the plant's water schedule.</p>

                    <p>**If the plant's water schedule is set to manual, clicking Water will not generate a solar forcast and instead use the water interval manually set by the user.</p>

                    <p>Clicking Snooze will update the plant's water schedule next water date to check the plant again in 3 days, regardless of manual or automatic settings.</p>

                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Managing your plant's care routine</Typography>

                    <p>From anywhere in the app you can click on a plant's name to view the plant's details page.</p>

                    <p>In the plant details page, you can view where the plant resides in your collection, view the plant's current water schedule, and view the care history table that shows care events and notes about the plant (if applicable).</p>

                    <p>You can edit the plant's details such as the name, type, or photo. Change the plant's location or lightsource, and even set a manual water schedule to control the exact number of days between watering that you want (for controlled environments).</p>

                    <p>If your plant dies you can delete it from the app , but its reccommended that you review the water history table to see if you can understand why it may have died.</p>

                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Tips for success</Typography>
                    <p>

                    </p>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">1. Stagger your setup.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>  
                            <ul>
                                <li>If you have a large plant collection in many rooms, or just a large collection in general, it's reccomemended to set up your plants in small groups.</li>

                                <li>For example, set up your Bedroom plants one day, then set up the Kitchen plants the next day, or set up a group of plants next to a specific window or artificial light spread out over multiple days. This can help spread out the watering days and prevent heavy waterings days.</li>

                                <li>If you would rather water all of your plants on specific days you can set them up all at once and similar plant types will likely fall on the same days if they are in the same environment.</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">2. Always check the plant's soil before you water.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>  
                            <ul>
                                <li>Water Mate calculates a water date for your plants, but it doesn't consider other important enviromental factors such as a lightsource being blocked by trees or a building, cloud cover, temperature, or general humidity in your environment (at least not yet!). Therfore, you should always check your plant's soil before you water.</li>

                                <li>Check the soil with your hands, use a toothpick, or use a moisture meter to check your soil before you water.</li>

                                <li>Many plants can survive some underwatering, but most plants will die if they are overwatered for too long.</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">3. Know what type of plant you have and the general care requirements it needs to thrive.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>  
                            <ul>
                                <li>Most plants will thrive in bright indirect light, but this can be accompished in many different ways. A sheer curtain in a West window, or placing a plant a few feet away from a South window(in the southern hemisphere a North window).</li>

                                <li>Some plants can survive in low light environments but will likely not thrive or grow much. If you love plants that need a lot of light but you only have access to low light conditions - consider adding artifical plant growing lights.</li>

                                <li>Does your plant like a lot of humidity? Consider placing it in a humid area or adding a humidifier next to your plant.</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                   
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">4. Make sure the soil is appropriate for the type of plant you have.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>  
                            <ul>
                                <li>People often overlook the soil or potting medium for their plants and assume the soil the plant arrived in is appropriate for the plant. Most often, this is not true! Doing some research on the type of soil your plant needs will make a huge difference in the health of your plant.</li>

                                <li>Experiment with making your own soil mixes that work best for your environment.</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">5. Watch for signs of poor health and make minor adjustments as needed.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>  
                            <ul>
                                <li>Is your plant wilting, shriveled, or the leaves gettting burned spots from the sun or drying leaf tips? Are the leaf colors looking faded? This could be a sign your plant is getting too much direct sunlight or not enough water.</li>

                                <li>Are the leaves turning yellow, stems getting soft/soggy, or soil growing mold/have a bad odor? This could be a sign that you are watering your plant too much, or you have poor soil drainage, or a consequence of a plant not getting the light it needs to photosynthesize.</li>

                                <li>Take notes about the condition of your plant and make minor adjustments, moving it closer or farther from lightsources and note what effect this has on the plant over the course of a few weeks.</li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>


                </Paper>
            </Box>
        </Container>
    );
};

export default GetStarted;
