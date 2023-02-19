import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Button, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import useLightSource from './useLightSource';
import UserContext from '../context/UserContext';
import { addLightSource } from './useLightSource';

const LightSourceForm = ({ close, setAddLight, roomId, current }) => {
    const { token } = useContext(UserContext);
    const [error, message, setMessage, handleLightSourceRequest] = useLightSource();

    const artificial = current.find((light) => (light.type === 'Artificial')) ? true : false;
    const north = current.find((light) => (light.type === 'North')) ? true : false;
    const northeast = current.find((light) => (light.type === 'Northeast')) ? true : false;
    const northwest = current.find((light) => (light.type === 'Northwest')) ? true : false;
    const south = current.find((light) => (light.type === 'South')) ? true : false;
    const southeast = current.find((light) => (light.type === 'Southeast')) ? true : false;
    const southwest = current.find((light) => (light.type === 'Southwest')) ? true : false;
    const east = current.find((light) => (light.type === 'East')) ? true : false;
    const west = current.find((light) => (light.type === 'West')) ? true : false;

    const formik = useFormik({
        initialValues: {
            Artificial: false,
            North: false,
            Northeast: false,
            Northwest: false,
            South: false,
            Southeast: false,
            Southwest: false,
            East: false,
            West: false,
        },
        onSubmit: async (values) => {
            let result = await handleLightSourceRequest(addLightSource(token, { ...values, roomId }));
            if (result.success) setMessage(result.message);
        },
    });

    const handleCancel = () => {
        setMessage(null);
        setAddLight(false);
    }

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">Light Source Types</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.Artificial}
                                    onChange={formik.handleChange}
                                    name="Artificial"
                                    disabled={artificial} />
                            }
                            label="Artificial" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.North}
                                    onChange={formik.handleChange}
                                    name="North"
                                    disabled={north} />
                            }
                            label="North" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.Northeast}
                                    onChange={formik.handleChange}
                                    name="Northeast"
                                    disabled={northeast} />
                            }
                            label="Northeast" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.Northwest}
                                    onChange={formik.handleChange}
                                    name="Northwest"
                                    disabled={northwest} />
                            }
                            label="Northwest" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.South}
                                    onChange={formik.handleChange}
                                    name="South"
                                    disabled={south} />
                            }
                            label="South" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.Southeast}
                                    onChange={formik.handleChange}
                                    name="Southeast"
                                    disabled={southeast} />
                            }
                            label="Southeast" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.Southwest}
                                    onChange={formik.handleChange}
                                    name="Southwest"
                                    disabled={southwest} />
                            }
                            label="Southwest" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.East}
                                    onChange={formik.handleChange}
                                    name="East"
                                    disabled={east} />
                            }
                            label="East" />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.West}
                                    onChange={formik.handleChange}
                                    name="West"
                                    disabled={west} />
                            }
                            label="West" />
                    </FormGroup>
                    <FormHelperText>Select all Light Sources that are applicable in your room.</FormHelperText>
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
                        onClick={() => close('add-light')}
                    >
                        Close
                    </Button>
                    :
                    <>
                        <Button
                            color="success"
                            sx={{ color: '#fff' }}
                            variant="contained"
                            size="large"
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={handleCancel}
                            color="info"
                            sx={{ color: '#fff' }}
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

export default LightSourceForm;
