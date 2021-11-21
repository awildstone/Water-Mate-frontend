import { useState, useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PlantCard from '../plant/PlantCard';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import UserContext from '../context/UserContext';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import Loading from '../alerts/Loading';
import Paginator from '../Paginator';
import PlantContext from '../context/PlantContext';


const WaterManager = ({ userPlantCount, getPlantsToWater, handleUpdateSchedule }) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const { currentUser } = useContext(UserContext);
    const { plantTypes } = useContext(PlantContext);
    const [ plantsToWater, setplantsToWater ] = useState(null);
    const [ plantRooms, setPlantRooms ] = useState(null);
    const [ anchorSort, setAnchorSort ] = useState(null);
    const [ anchorFilter, setAnchorFilter ] = useState(null);
    const openSort = Boolean(anchorSort);
    const openFilter = Boolean(anchorFilter);

    const [itemsPerPage, setItemsPerPage] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(null);

    /** Gets the plants to water, gets plants any time page or currentUser changes. */
    useEffect(() => {
        if (currentUser) {
            handleGetPlantsToWater();
        }
        setIsLoading(false);
    },[page, currentUser]);

    /** Handles updating the current page in pagination. */
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    /** Gets a filtered list of all plants that are ready to water. Filters by user_id or room_id.
     * Sets the plantsToWater, pagination data, and unique list of plants(filtered by room.id) in state.
     */
    async function handleGetPlantsToWater(room_id=null) {
        let plants;
        if (room_id) {
            plants = await getPlantsToWater(page, {'room_id': room_id });
        } else {
            plants = await getPlantsToWater(page, {'user_id': currentUser.id });
        }
        
        if (plants) {
            setplantsToWater(plants.plants);
            setItemsPerPage(plants.itemsPerPage);
            setCount(plants.count);
            filterPlantRooms(plants.plants);
        } 
    }

    /** Generates a unique list of plant objects by room.id (for an array of unique rooms).
     * Assumes that only the first room.id instance should be part of the array. */
    const filterPlantRooms = (plants) => {
        let flag = {};
        let uniqueRooms = plants.filter((plant) => {
            if (flag[plant.room.id]) {
                return false;
            }
            flag[plant.room.id] = true;
            return true;
        });
        setPlantRooms(uniqueRooms);
    }

    /** Handles click events for opening sorting/filtering menus by setting the menu anchor boolean. */
    const handleClick = (event, type) => {
        if (type === 'sort') setAnchorSort(event.currentTarget);
        else setAnchorFilter(event.currentTarget);
    };

    /** Handles the closing of sort/filter menus. Calls the appropriate sort/filter method based on the action criteria, then updates the anchor boolean to close the respective menu. */
    const handleClose = (event, type, criteria=null) => {
        if (type === 'sort') {
            if (criteria === 'date') sortByDate();
            if (criteria === 'type') sortByType();
            if (criteria === 'urgency') sortByUrgency();
            setAnchorSort(null);   
        } else {
            //type is filter
            if (criteria === 'room') filterByRoom(event);
            setAnchorFilter(null);
        } 
    };

    /** Sorts the current list of plants by the last water date. */
    const sortByDate = () => {
        plantsToWater.sort((a, b) => {
            return new Date(a.water_schedule[0].water_date + 'Z') - new Date(b.water_schedule[0].water_date + 'Z');
        });
        setplantsToWater(plantsToWater);
    };

    /** Sorts the current list of plants by plant type. */
    const sortByType = () => {
        plantsToWater.sort((a, b) => {
            return a.type_id - b.type_id;
        });
        setplantsToWater(plantsToWater);
    };

    /** Sorts the current list of plants by the urgency to water.
     * The plant's type determines the max_days_without_water that a plant can go without water. 
     * The max_days_without_water is subtracted from the current date to find the oldest possible day in the past the plant should have been watered.
     * The last water date for the plant is subtracted from the calculated oldest possible date to determine how much time has passed since the plant was last watered. Plants that have higher time past the reccomended date are highest urgency. Plants with a negative difference are within the threshold and low urgency for watering.
     */
    const sortByUrgency = () => {
        plantsToWater.sort((a, b) => {
            let dateA = new Date(a.water_schedule[0].water_date + 'Z');
            let dateB = new Date(b.water_schedule[0].water_date + 'Z');
            let todayA = new Date();
            let todayB = new Date();

            //get the max_days_without_water interval
            let plantTypeWaterIntervalA = plantTypes.filter((type) => a.type_id === type.id)[0].max_days_without_water;
            let plantTypeWaterIntervalB = plantTypes.filter((type) => b.type_id === type.id)[0].max_days_without_water;

            //subtract max_days_without_water interval from the current day
            todayA.setDate(todayA.getDate() - plantTypeWaterIntervalA);
            todayB.setDate(todayB.getDate() - plantTypeWaterIntervalB);

            //calculate the number of days past the oldest possible water date calculated above
            let timeDifferenceA = todayA - dateA;
            let timeDifferenceB = todayB - dateB;

            // console.log(`${a.name} max days ago${todayA.toLocaleString()} - last water date ${dateA.toLocaleString()} = ${Math.ceil(timeDifferenceA / (1000 * 60 * 60 * 24))}`);
            // console.log(`${b.name} max days ago ${todayB.toLocaleString()} - last water date ${dateB.toLocaleString()} = ${Math.ceil(timeDifferenceB / (1000 * 60 * 60 * 24))}`);

            return timeDifferenceB - timeDifferenceA
        });
        setplantsToWater(plantsToWater);
    }

    /** Gets a paginated list of plants that are ready to water filtered by the room the plants reside in. Resets to paginated list of all plants ready to water for "Show All" selection. */
    const filterByRoom = (event) => {
        const action = event.target.innerText;
        if (action !== 'Show All') {
            const split = action.split(' ');
            const len = split.length;
            const room_id = split[len-1].toString();
            handleGetPlantsToWater(room_id);
        } else {
            handleGetPlantsToWater();
        }
    };

    const noPlants = () => {
        return (
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', '& > :not(style)': { m: 1, p: 2 } }}>
                    <Grid sx={{ flexGrow: 1 }} container alignItems='stretch' justifyContent='space-evenly' spacing={2}>
                        <Grid item>
                            <Paper>
                            <Typography variant="h2" component="div">
                                No Plants!?
                            </Typography>
                            <p>You don't have any plants in your collection yet! Head over to the <a href="/dashboard">Dashboard</a> to add your plants.</p>
                            <img src='/images/houseplant_lineup_sm.png' width='100%' alt='Lineup of houseplants' />
                            </Paper> 
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        );
    }

    const hasPlants = () => {
        return (
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', '& > :not(style)': { m: 1, p: 2 } }}>
                    <Grid sx={{ flexGrow: 1 }} container alignItems='stretch' justifyContent='space-evenly' spacing={2}>
                        <Grid item>
                            <Paper>
                                <Typography variant="h2" component="div">Water Manager</Typography>
                                <img src='/images/houseplant_lineup_sm.png' width='100%' alt='Lineup of houseplants' />
                                <Box sx={{ backgroundColor: '#243246', textAlign: "right", borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
                                    <Tooltip title="Sort Plants">
                                        <Button
                                            onClick={(e) => handleClick(e, 'sort')}
                                            aria-label="sort-button"
                                            aria-haspopup="true"
                                            aria-expanded={openSort ? 'true' : undefined} 
                                            sx={{ color: '#fff' }} 
                                            size="small" 
                                            startIcon={<ArrowDropDownIcon />}
                                        >
                                            Sort <SortRoundedIcon />
                                        </Button>
                                    </Tooltip>

                                    <Menu
                                        id="sort-menu"
                                        anchorEl={anchorSort}
                                        open={openSort}
                                        onClose={(e) => handleClose(e,'sort')}
                                    >
                                        <MenuList>
                                          <MenuItem onClick={(e) => handleClose(e, 'sort', 'date')}>
                                            <ListItemIcon>
                                              <DateRangeRoundedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Last Water Date</ListItemText>
                                          </MenuItem>
                                          <MenuItem onClick={(e) => handleClose(e, 'sort', 'type')}>
                                            <ListItemIcon>
                                              <CategoryRoundedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Plant Type</ListItemText>
                                          </MenuItem>
                                          <MenuItem onClick={(e) => handleClose(e, 'sort', 'urgency')}>
                                            <ListItemIcon>
                                              <WarningAmberRoundedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Water Urgency</ListItemText>
                                          </MenuItem>
                                        </MenuList>
                                    </Menu>

                                    <Tooltip title="Filter Plants by Room">
                                        <Button
                                            onClick={(e) => handleClick(e, 'filter')} 
                                            aria-label="filter-button"
                                            aria-haspopup="true"
                                            aria-expanded={openFilter ? 'true' : undefined}
                                            label="Filter"
                                            sx={{ color: '#fff' }} 
                                            size="small" 
                                            startIcon={<ArrowDropDownIcon />}
                                        >
                                            Filter <FilterListRoundedIcon />
                                        </Button>
                                    </Tooltip>

                                    <Menu
                                        id="filter-menu"
                                        anchorEl={anchorFilter}
                                        open={openFilter}
                                        onClose={(e) => handleClose('filter')}
                                    >
                                        <MenuList>
                                          <MenuItem onClick={(e) => handleClose(e, 'filter', 'room')}>
                                            <ListItemIcon>
                                              <GridViewRoundedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>Show All</ListItemText>
                                          </MenuItem>
                                          { plantRooms.map((plant, i) =>  {
                                            return (
                                                <MenuItem key={i+1} onClick={(e) => handleClose(e, 'filter', 'room')}>
                                                    <ListItemIcon>
                                                            <BedroomChildRoundedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        {plant.room.name} <span style={{color: '#fff'}}>{plant.room.id}</span>
                                                    </ListItemText>
                                                </MenuItem>
                                            )
                                            }) 
                                          }
                                        </MenuList>
                                    </Menu>
                                </Box>
                            </Paper>
                        </Grid>
                        
                        { plantsToWater.length ?

                            plantsToWater.map((plant) => {
                                return (
                                    <Grid key={plant.id} item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'stretch' }}>
                                        <PlantCard 
                                            plant={plant}
                                            waterSchedule={plant.water_schedule[0]}
                                            handleUpdateSchedule={handleUpdateSchedule}
                                        />
                                    </Grid>
                                )
                            })

                            :
                                <Grid item>
                                    <Typography variant="h5" component="div" sx={{ m: 3 }}>
                                        There are no plants to water today! Take a break ツ
                                    </Typography>
                                    <img src='/images/succulent_terrariums.png' width='60%' alt='Lineup of houseplants' />
                                </Grid>
                        }
                    </Grid>
                    <Grid container sx={{ flexGrow: 1, '& > :not(style)': { m: 1 } }} justifyContent="center">
                        <Grid item>
                            { count > itemsPerPage ?
                                <Paginator
                                    title={'View More Plants'}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={page}
                                    pageCount={Math.ceil(count / itemsPerPage)}
                                    handlePageChange={handlePageChange}
                                />
                                :
                                ''
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        );
    }

    if (isLoading || !currentUser || !plantsToWater || !plantRooms) {
        return <Loading />
    } else {
        if (userPlantCount > 0) {
            return hasPlants();
        } else {
            return noPlants();
        }
    }
}

export default WaterManager;