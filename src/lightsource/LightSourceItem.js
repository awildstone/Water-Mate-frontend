import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import WarningModal from '../alerts/WarningModal';
import useLightSource from './useLightSource';
import { deleteLightSource } from './useLightSource';


/** LightSourceItem renders a list item for a room that displays Lightsource data and renders a 
 * WarningModal for deleting the Lightsource. */

const LightSourceItem = ({ light, handleOpen, deleteLight, setDeleteLight, handleClose }) => {
    const [ error, message, setMessage, handleLightSourceRequest ] = useLightSource();
    return (
        <ListItem>
            <Tooltip title="Remove Light Source">
                <IconButton 
                    onClick={() => handleOpen('delete-light')} 
                    aria-label={light.type}
                    color="secondary" 
                    size="small">
                    <LightModeRoundedIcon />
                    {light.type}
                    <DeleteForeverRoundedIcon />
                </IconButton>
            </Tooltip>

            <WarningModal
                title='Remove Lightsource'
                type='Lightsource'
                action='delete-light'
                open={deleteLight}
                close={setDeleteLight}
                handleClose={handleClose}
                handleDelete={handleLightSourceRequest}
                request={deleteLightSource}
                resource={'light'}
                id={light.id}
            />
        </ListItem>
    );
};

export default LightSourceItem;
