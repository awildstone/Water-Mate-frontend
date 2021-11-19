import { NavLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';

/**  PlantItem renders a plant list item for room that displays the plant data from the plant prop. */
const PlantItem = ({ plant }) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Tooltip title="View Plant Details">
                    <Link 
                        underline="none" 
                        color="secondary" 
                        component={NavLink} 
                        to={`/plant/${plant.id}`}
                    >
                        <Avatar alt={plant.name} src={plant.image}/>
                    </Link>
                </Tooltip>
            </ListItemAvatar>
            <ListItemText>
                <Tooltip title="View Plant Details">
                    <Link 
                        underline="none" 
                        color="secondary" 
                        component={NavLink} 
                        to={`/plant/${plant.id}`}
                    >
                        {plant.name}
                    </Link>
                </Tooltip>
            </ListItemText>
        </ListItem>
    );
};

export default PlantItem;