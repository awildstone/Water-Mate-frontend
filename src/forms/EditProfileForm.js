import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const validationSchema = yup.object({
    name: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter your name.'),
    email: yup.string()
        .email('Invalid email address.')
        .required('You must enter your email.'),
    username: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter a username.'),
    confirm_password: yup.string()
        .min(8, 'Your password must be greater than 7 characters.')
        .max(50, 'Too Long!')
        .required('You must confirm your password.'),
});

const EditProfileForm = ({close, handleEdit, user }) => {
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const formik = useFormik({
        initialValues: {
          name: user.name,
          email: user.email,
          username: user.username,
          confirm_password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            let result = await handleEdit('user', user.id, values);
            if(result.success) {
                close('edit-profile');
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
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    autoComplete="password"
                    variant="outlined"
                    margin="normal"
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                    helperText={formik.touched.confirm_password && formik.errors.confirm_password}
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
                <Button onClick={() => close('edit-profile')} color="info" sx={{ color: '#fff'}} variant="contained" size="large">
                    Cancel
                </Button>
            </Stack>
        </form>
    );
}

export default EditProfileForm;