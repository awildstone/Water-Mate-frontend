import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { red } from '@mui/material/colors';
import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { modalStyle } from '../utils';

const WarningModal = ({ 
    title, 
    type, 
    action, 
    open,
    close, 
    handleClose,
    handleDelete, 
    request, 
    id, 
    redirect=null }) => {

    const [ isConfirmed, setIsConfirmed ] = useState(false);
    const [ isChecked, setIsChecked ] = useState(false);
    const [ error, setError ] = useState(null);
    const history = useHistory();
    const { token } = useContext(UserContext);
    
    /** Toggles checkbox state & sets confirmation state conditionally. */
    const handleCheck = () => {
        setIsChecked(!isChecked);

        if (!isChecked) {
            setIsConfirmed(true);
        } else {
            setIsConfirmed(false);
        }
    }

    /** Handles action for cancel button, clearing checkbox, error & confirmation state and calls close function. */
    const handleCancel = () => {
        setIsConfirmed(false);
        setIsChecked(false);
        setError(null);
        close(false);
    }

    return (
        <Box sx={modalStyle}>
            <Dialog
                open={open}
                onClose={() => close(false)}
                aria-labelledby="confirm-dialog"
            >
                <DialogTitle id="confirm-dialog">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    <WarningIcon sx={{ color: red[500] }} /> Warning! Deleting your {type} cannot be undone and all data will be lost. Please confirm that you want to delete your {type}.
                    </DialogContentText>
                    <FormGroup>
                        <FormControlLabel 
                            control={<Checkbox checked={isChecked} onClick={handleCheck} />} 
                            label="I understand" 
                        />
                    </FormGroup>
                </DialogContent>
                <div>
                    { error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : '' }
                </div>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={handleCancel}
                        color="info"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={async () => {
                            let result = await handleDelete(request(token, id));

                            if (result.success) {
                                if (redirect) history.push(redirect);
                                handleClose(action);
                            } else {
                                setError(result.message);
                            }
                        }}
                        disabled={!isConfirmed}
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default WarningModal;
