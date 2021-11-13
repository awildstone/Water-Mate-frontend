import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';

const AddLightSourceForm = ({ close, handleAdd, roomId, current }) => {
    const [ error, setError ] = useState(null);

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
            console.log(values);

            if (Object.values(values).every(value => value === false)) {
                close('add-light');
            } else {
                let result = await handleAdd('light', {...values, roomId})

                if (result.success) {
                    close('add-light');
                } else {
                    setError(result.message);
                } 
            }
        },
    });
    
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
                                    disabled={current.filter((light) => (light.type === 'Artificial' ? true : false))[0]} />
                                } 
                                label="Artificial" />
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        checked={formik.values.North} 
                                        onChange={formik.handleChange} 
                                        name="North"
                                        disabled={current.filter((light) => (light.type === 'North' ? true : false))[0]} />
                                    } 
                                label="North" />
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        checked={formik.values.Northeast} 
                                        onChange={formik.handleChange} 
                                        name="Northeast"
                                        disabled={current.filter((light) => (light.type === 'Northeast' ? true : false))[0]} />
                                    } 
                                label="Northeast" />
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        checked={formik.values.Northwest} 
                                        onChange={formik.handleChange} 
                                        name="Northwest"
                                        disabled={current.filter((light) => (light.type === 'Northwest' ? true : false))[0]} />
                                    } 
                                label="Northwest" />
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        checked={formik.values.South} 
                                        onChange={formik.handleChange} 
                                        name="South"
                                        disabled={current.filter((light) => (light.type === 'South' ? true : false))[0]} />
                                    } 
                                label="South" />
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        checked={formik.values.Southeast} 
                                        onChange={formik.handleChange} 
                                        name="Southeast"
                                        disabled={current.filter((light) => (light.type === 'Southeast' ? true : false))[0]} />
                                    } 
                                label="Southeast" />
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        checked={formik.values.Southwest} 
                                        onChange={formik.handleChange} 
                                        name="Southwest" 
                                        disabled={current.filter((light) => (light.type === 'Southwest' ? true : false))[0]} />
                                    } 
                                label="Southwest" />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={formik.values.East} 
                                        onChange={formik.handleChange} 
                                        name="East"
                                        disabled={current.filter((light) => (light.type === 'East' ? true : false))[0]} />
                                    } 
                                label="East" />
                            <FormControlLabel 
                                control={
                                    <Checkbox 
                                        checked={formik.values.West} 
                                        onChange={formik.handleChange} 
                                        name="West"
                                        disabled={current.filter((light) => (light.type === 'West' ? true : false))[0]} />
                                    } 
                                label="West" />
                        </FormGroup>
                        <FormHelperText>Select all Light Sources that are applicable in your room.</FormHelperText>
                    </FormControl>
                </div>
                <div>
                    { error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : '' }
                </div>
                <Stack direction="row" spacing={2} >
                <Button color="success" sx={{ color: '#fff'}} variant="contained" size="large" type="submit">
                    Submit
                </Button>
                <Button onClick={() => close('add-light')} color="info" sx={{ color: '#fff'}} variant="contained" size="large">
                    Cancel
                </Button>
                </Stack>
        </form>
    );
}

export default AddLightSourceForm;