import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import UserContext from '../context/UserContext';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import usePlants from './usePlants';
import { editPlantRoom } from './usePlants';

const validationSchema = yup.object({
    room_id: yup.string()
        .required('You must select a room.'),
    lightsource_id: yup.string()
        .required('You must select a light source.'),
});

const EditPlantRoomForm = ({ close, setEditPlantRoom, plant, rooms }) => {
    const { token } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, plants, setPlants, handlePlantRequest] = usePlants();
    const [room, setRoom] = useState(plant.room);
    const [message, setMessage] = useState(null);

    const formik = useFormik({
        initialValues: {
            room_id: plant.room_id,
            lightsource_id: plant.light_id,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            const data = { roomId: values.room_id, lightsourceId: values.lightsource_id }
            const result = await handlePlantRequest(editPlantRoom(token, plant.id, data));
            if (result.success) setMessage(result.message);
            setIsLoading(false);
        },
    });

    const updateRoomLightsources = (e) => {
        const roomId = e.target.value;
        const newRoom = rooms.filter((room) => room.id === roomId);
        formik.setFieldValue('lightsource_id', '');
        setRoom(newRoom[0]);
    }

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="collection-rooms-label">Collection Rooms</InputLabel>
                    <Select
                        labelId="collection-rooms-label"
                        id="room_id"
                        name="room_id"
                        value={formik.values.room_id}
                        label="Collection Rooms"
                        onChange={(e) => {
                            formik.handleChange(e);
                            if (e.target.value) updateRoomLightsources(e);
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.touched.room_id && Boolean(formik.errors.room_id)}
                    >
                        <MenuItem value=""><em>Select</em></MenuItem>
                        {rooms.map((room) => {
                            return <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText>
                        {formik.touched.room_id && Boolean(formik.errors.room_id) ? formik.errors.room_id
                            : "Select the room you are moving your plant to."}
                    </FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="light-source-label">Light Source</InputLabel>
                    <Select
                        labelId="light-source-label"
                        id="lightsource_id"
                        name="lightsource_id"
                        value={formik.values.lightsource_id}
                        label="ight Source"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lightsource_id && Boolean(formik.errors.lightsource_id)}
                    >
                        <MenuItem value=""><em>Select</em></MenuItem>
                        {room.lightsources.map((light) => {
                            return <MenuItem key={light.id} value={light.id}>{light.type}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText>
                        {formik.touched.lightsource_id && Boolean(formik.errors.lightsource_id) ? formik.errors.lightsource_id
                            : "Choose from available light source."}
                    </FormHelperText>
                </FormControl>
            </div>
            <div>
                {error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : ''}
                {message ? <Alert sx={{ mb: 1 }} severity="success">{message}</Alert> : ''}
            </div>
            <Stack direction="row" spacing={2} >
                {message ?
                    <Button
                        color="success"
                        sx={{ color: '#fff' }}
                        variant="contained"
                        size="large"
                        onClick={() => close('edit-plant-room')}
                    >
                        Close
                    </Button>
                    :
                    <>
                        {!isLoading ?
                            <>
                                <Button
                                    color="success" sx={{ color: '#fff' }}
                                    variant="contained"
                                    size="large"
                                    type="submit">
                                    Submit
                                </Button>

                                <Button
                                    onClick={() => setEditPlantRoom(false)}
                                    color="info" sx={{ color: '#fff' }}
                                    variant="contained"
                                    size="large"
                                >
                                    Cancel
                                </Button>
                            </>
                            :
                            <LoadingButton
                                loading
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="outlined"
                            >
                                Saving
                            </LoadingButton>
                        }
                    </>
                }
            </Stack>
        </form>
    );
}

export default EditPlantRoomForm;