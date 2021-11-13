import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import PlantContext from '../context/PlantContext';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const SUPPORTED_FORMATS =  [ "image/jpg", "image/jpeg", "image/gif", "image/png" ];
const FILE_SIZE = 3145728;

const validationSchema = yup.object({
    name: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter a name for your plant.'),
    water_date: yup.date(),
    file: yup.mixed()
        .test('size', 'Maximum file size is 3 MB.', value => value.size <= FILE_SIZE )
        .test('type', 'Allowed file formats: .jpg .jpeg .gif .png', value => SUPPORTED_FORMATS.includes(value.type)),
    plant_type: yup.string()
        .required('You must select a plant type.'),
    light_source: yup.string()
        .required('You must select a light source.'),
});

const AddPlantForm = ({ close, handleAdd, roomId, lightSources }) => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const { plantTypes } = useContext(PlantContext);

    const formik = useFormik({
        initialValues: {
          name: '',
          water_date: '',
          file: { size: 0, type: 'image/jpg' },
          plant_type: '',
          light_source: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            const data = new FormData();

            if (values.file.size) {
                data.append('file', values.file);
                data.append('name', values.name);
            } 
            data.append('name', values.name);
            data.append('water_date', values.water_date);
            data.append('plant_type', values.plant_type);
            data.append('light_source', values.light_source);
            data.append('roomId', roomId);

            setIsLoading(true);
            const result = await handleAdd('plant', data, 'multipart/form-data');
        
            if(result.success) {
                close('add-plant');
            } else {
                setError(result.message);
            }
            setIsLoading(false);
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data" autoComplete="off">
                <div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </div>
                <div>
                    <TextField
                        type="date"
                        variant="outlined"
                        margin="normal"
                        id="water_date"
                        name="water_date"
                        value={formik.values.water_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.water_date && Boolean(formik.errors.water_date)}
                        helperText={formik.touched.water_date && formik.errors.water_date}
                    />
                </div>
                <div>
                    <TextField
                        type="file"
                        variant="outlined"
                        margin="normal"
                        id="file"
                        name="file"
                        onChange={(e) => {
                            formik.setFieldValue("file", e.currentTarget.files[0]);
                          }}
                        error={formik.touched.file && Boolean(formik.errors.file)}
                        helperText={formik.touched.file && formik.errors.file}
                    />
                </div>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="plant-type-label">Plant Type</InputLabel>
                        <Select
                            labelId="plant-type-label"
                            id="plant_type"
                            name="plant_type"
                            value={formik.values.plant_type}
                            label="Plant Type"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.plant_type && Boolean(formik.errors.plant_type)}
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            { plantTypes.map((type) => {
                                return <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                            }) }
                        </Select>
                        <FormHelperText>
                            {formik.touched.plant_type && Boolean(formik.errors.plant_type) ? formik.errors.plant_type 
                            : "Choose the type of plant you have."}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="light-source-label">Light Source</InputLabel>
                        <Select
                            labelId="light-source-label"
                            id="light_source"
                            name="light_source"
                            value={formik.values.light_source}
                            label="ight Source"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.light_source && Boolean(formik.errors.light_source)}
                        >
                            <MenuItem value=""><em>Select</em></MenuItem>
                            { lightSources.map((light) => {
                                return <MenuItem key={light.id} value={light.id}>{light.type}</MenuItem>
                            }) }
                        </Select>
                        <FormHelperText>
                            {formik.touched.light_source && Boolean(formik.errors.light_source) ? formik.errors.light_source 
                            : "Choose from available light source."}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div>
                    { error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : '' }
                </div>
                <Stack direction="row" spacing={2} >
                { !isLoading ?
                    <Button color="success" sx={{ color: '#fff'}} variant="contained" size="large" type="submit">
                        Submit
                    </Button>
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
                <Button onClick={() => close('add-plant')} color="info" sx={{ color: '#fff'}} variant="contained" size="large">
                    Cancel
                </Button>
                </Stack>
        </form>
    );
}

export default AddPlantForm;