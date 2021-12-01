import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';

const About = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 2, p: 2 } }}>
                <Paper>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>About Water Mate</Typography>
                        <img className="rounded" src='/images/plant_collection.png' alt="Water Mate" height="300px" />
                    </Box>
                    
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>The need for better plant care</Typography>

                    <p>Like many plant collectors, I quickly found myself overwhelmed by the number of plants I somehow came home with  and found myself struggling to keep track of the care routines each plant needs. This lead to many wilted plants crying for attention (fittonias anyone??).</p>

                    <p>With the growing season fast approaching in the PNW, I needed a solution that could help me organize my plant collection in my home, help me keep track of the health of my plants, and help remind me when its time to water my plants.</p>

                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>How Water Mate works</Typography>

                    <p>I want Water Mate to be helpful for plant collectors around the world, so I designed an algorithm that takes a user's location on earth to calculate a water schedule for a plant. A solar forcast that is unique to the user's location and the time of year is used to calculate a watering schedule for a plant with consideration of the plant's type and the care and light requirements that plant needs (and recieves) in the user's home.</p>

                    <p>The algorithm uses a solar forcast API <Link underline="none" color={'#1CBC9B'} href="https://sunrise-sunset.org/">Sunrise-Sunset API</Link> to account for changes and adjust the watering schedule for a plant. Changes such as seasonal (transitioning from winter to the summer growing season) or even moving your plant's location in your home (changing its lightsource). The algorithm also considers less than optimal conditions based on the plant's type and adjusts accordingly.</p>
                    
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Features</Typography>
                    <p>Users have control over how their collection is organized, and Water Mate takes care of the rest!</p>
                   
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">Water Manager</Typography>
                        </AccordionSummary>
                        <AccordionDetails>  
                            Water Mate calculates the next water date for your plant then displays the plant in the Water Manager view when its time to water.

                            <img className="rounded" src='/images/water_manager_view.png' alt="Water Manager View" width="100%" />

                            <p>In the Water Manager, users can Water or Snooze the plant.</p>

                            <p>Users can add notes about the plant for the Water or Snooze event such as the condition of the plant, pest prevention or other care notes, or why the water schedule was snoozed.</p>

                            <p> Clicking <b>Water</b> will activate the Water Mate algorithm to generate a solar forcast using realtime solar data and calculate the next reccomended water date for your plant.</p>
                            <p className="center"><img className="rounded" src='/images/water_plant.png' alt="Water a plant" width="40%" /></p>

                            <p>Clicking <b>Snooze</b> will update the plant's water schedule to check if needs water in 3days.</p>
                            <p className="center"><img className="rounded" src='/images/snooze_plant.png' alt="Snooze a plant" width="40%" /></p>
                            
                           
                            <p>Users can sort plants to water by <b>last water date</b>, <b>plant type</b>, or <b>water urgency</b> (plants that are past the reccomended base water interval for their type).</p>
                            <p className="center"><img className="rounded" src='/images/sort_water_manager.png' alt="Sort by Criteria in Water Manager" width="40%" /></p>
                            
                            <p>Users can filter plants to water by <b>Room</b> so they can water plants room to room.</p>
                            <p className="center"><img className="rounded" src='/images/filter_water_manager.png' alt="Filter by Criteria in Water Manager" width="40%" /></p>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">Dashboard View</Typography>
                        </AccordionSummary>
                        <AccordionDetails>  
                            Users can see a bird's eye view of their Collection(s) in the Dashboard where the details can be viewed, edited, or deleted.
                            <ul>
                                <li>Users can organize their plants into Collection(s) like Home or Work.</li>
                                <li>Inside a user's collection are Rooms like Bedroom or Kitchen.</li>
                                <li>Rooms organize Lightsources (like Artifical lights South, or East window) and Plants!</li>
                                <li>Users add Rooms to their Collection, select the Lightsource available in the Room, then add their Plant to the room selecting the plant's type and lightsource on creation.</li>
                            </ul>
                            <img className="rounded" src='/images/dashboard_view.png' alt="Dashboard View" width="100%" />
                             
                            <p>Users can toggle to view and manage their different collections in the dashboard.</p>
                            <p className="center"><img className="rounded" src='/images/toggle_collection.png' alt="Toggle Collections View" width="50%" /></p>

                            <p>Collections can be filtered by room for quick access to data.</p>
                            <p className="center"><img className="rounded" src='/images/filter_by_room.png' alt="Filter Collection by Room" width="50%" /></p>
                        </AccordionDetails>
                    </Accordion>
                  
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">Plant View</Typography>
                        </AccordionSummary>
                        <AccordionDetails>  
                            Users can view or manage the details about their plant in the Plant detail view.
                            <ul>
                                <li>Users can modify a plant's details such as the name, photo, type of plant, or lightsource.</li>
                                <li>Users can modify a plant's water schedule manually, and even set a manual water interval.</li>
                            </ul>
                            <img className="rounded" src='/images/plant_view.png' alt="Plant Details View" width="100%" />
                          
                            <p>Users can view the full history of the plant's care in the water history table.</p>
                            <p className="center"><img className="rounded" src='/images/view_water_history.png' alt="View Plant Water History" width="50%" /></p>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography variant="h6">Water Schedule</Typography>
                        </AccordionSummary>
                        <AccordionDetails>  
                            Water Mate fully automates your plant's water schedule using realtime location and solar data, but sometimes adjustments are needed to account for other environmental conditions outside of the app's control.
                            <ul>
                                <li>Users can set the water schedule to manual mode. This turns off the Water Mate algorithm and only reminds the user to water the plant after X number of days set by the user. Changes to the water interval will not occur until Manual Mode is disabled.</li>
                                <li>Users can modify the current water interval for a plant manually if they notice the algorithm is too frequent or not frequent enough. This keeps the Water Mate automation on, and seasonal adjustments  will continue.</li>
                            </ul>
                            <p className="center"><img className="rounded" src='/images/edit_schedule_view.png' alt="Edit Plant Schedule Form" width="50%" /></p>
                        </AccordionDetails>
                    </Accordion>
                    <p>

                    </p>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Interested in contributing?</Typography>

                    <p>Water Mate is my Capstone project as part of my Software Engineer training at Springboard. I'm learning about building apps and welcome any questions or suggestions for improvement. If you are a developer who is also passionate about plant care I would love to work with you on improving this project! You can check out the <Link underline="none" color={'#1CBC9B'} href="https://github.com/awildstone/Water-Mate">full code repository on my Github account</Link> and see details for how you can contribute.</p>
                </Paper>
            </Box>
        </Container>
    );
}

export default About;
