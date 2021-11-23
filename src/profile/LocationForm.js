import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import useProfile, { editLocation } from './useProfile';

const validationSchema = yup.object({
    city: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter your city for an accurate location.'),
    state: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    country: yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter your country for an accurate location.'),
});

const LocationForm = ({close, setEditLocation, user}) => {
    const [error, message, setMessage, handleProfileRequest] = useProfile();
    const [ isLoading, setIsLoading ] = useState(false);

    const formik = useFormik({
        initialValues: {
          city: '',
          state: '',
          country: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let result = await handleProfileRequest(editLocation(user.id, values));
            if (result.success) setMessage(result.message);
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
                { message ? <Alert sx={{ mb: 1 }} severity="success">{message}</Alert> : '' }
            </div>
            <Stack direction="row" spacing={2} >
            { message ? 
                <Button 
                    color="success" 
                    sx={{ color: '#fff'}} 
                    variant="contained" 
                    size="large" 
                    onClick={() => close('edit-location')}
                >
                    Close
                </Button>
                :
                <>
                    { !isLoading ?
                            <Button 
                                color="success" 
                                sx={{ color: '#fff'}} 
                                variant="contained" 
                                size="large" 
                                type="submit"
                            >
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

                    <Button 
                        onClick={() => setEditLocation(false)} 
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

export default LocationForm;
