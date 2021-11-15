import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


const validationSchema = yup.object({
    city: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter your city for an accurate location.'),
    state: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    country: yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter your country for an accurate location.'),
});

const EditLocationForm = ({close, handleEdit, user}) => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const formik = useFormik({
        initialValues: {
          city: '',
          state: '',
          country: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            let result = await handleEdit('user/location', user.id, values);
            if(result.success) {
                close('edit-location');
            } else {
                setError(result.message);
            }
            setIsLoading(false);   
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="city"
                    name="city"
                    label="City"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="state"
                    name="state"
                    label="State"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="country"
                    name="country"
                    label="Country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.country && Boolean(formik.errors.country)}
                    helperText={formik.touched.country && formik.errors.country}
                />
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
                <Button onClick={() => close('edit-location')} color="info" sx={{ color: '#fff'}} variant="contained" size="large">
                    Cancel
                </Button>
            </Stack>
        </form>
    );
}

export default EditLocationForm;