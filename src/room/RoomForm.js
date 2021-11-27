import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import useRooms from './useRooms';
import UserContext from '../context/UserContext';
import { addRoom, editRoom } from './useRooms';

const validationSchema = yup.object({
    name: yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter a name for your room.'),
});

const RoomForm = ({ close, setaddRoom, setEditRoom, collectionId=null, room=null }) => {
    const { token } = useContext(UserContext);
    const [ error, rooms, setRooms, handleRoomRequest ] = useRooms();
    const [ message, setMessage ] = useState(null);

    const formik = useFormik({
        initialValues: {
          name: room ? room.name : '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let result;
            if (room) {
                result = await handleRoomRequest(editRoom(token, room.id, values));
            } else {
                result = await handleRoomRequest(addRoom(token, {...values, collectionId}));
            }
            if (result.success) setMessage(result.message);
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="name"
                        name="name"
                        label="Room Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </div>
                <div>
                    { error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : '' }
                    { message ? <Alert sx={{ mb: 1 }} severity="success">{message}</Alert> : '' }
                </div>
                <Stack direction="row" spacing={2} >
                { message ? 
                    <Button 
                        color="success" 
                        sx={{ color: '#fff'}} 
                        variant="contained" 
                        size="large" 
                        onClick={() => room ? close('edit-room') : close('add-room')}
                    >
                        Close
                    </Button>
                    :
                    <>
                        <Button 
                            color="success" sx={{ color: '#fff'}} 
                            variant="contained" 
                            size="large" 
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button 
                            onClick={() => room ? setEditRoom(false) : setaddRoom(false)} 
                            color="info" 
                            sx={{ color: '#fff'}} 
                            variant="contained"
                            size="large"
                        >
                            Cancel
                        </Button>
                    </>
                }
                </Stack>
        </form>
    );
}

export default RoomForm;
