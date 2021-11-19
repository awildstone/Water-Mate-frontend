import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';

const LightSourceForm = ({ close, setAddLight, handleAdd, roomId, current }) => {
    const [ error, setError ] = useState(null);
    
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
            Artificial: artificial ? artificial : false,
            North: north ? north : false,
            Northeast: northeast ? northeast : false,
            Northwest: northwest ? northwest : false,
            South: south ? south : false,
            Southeast: southeast ? southeast : false,
            Southwest: southwest ? southwest : false,
            East: east ? east : false,
            West: west ? west : false,
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
                    { error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : '' }
                </div>
                <Stack direction="row" spacing={2} >
                <Button color="success" sx={{ color: '#fff'}} variant="contained" size="large" type="submit">
                    Submit
                </Button>
                <Button onClick={() => setAddLight(false)} color="info" sx={{ color: '#fff'}} variant="contained" size="large">
                    Cancel
                </Button>
                </Stack>
        </form>
    );
}

export default LightSourceForm;